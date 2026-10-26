import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { useMotionSetting } from "@/hooks/useMotion";

type LenisController = {
  raf: (time: number) => void;
  on: (event: "scroll", callback: () => void) => void;
  off: (event: "scroll", callback: () => void) => void;
  scrollTo: (target: number | HTMLElement, options?: { offset?: number; duration?: number }) => void;
  stop: () => void;
  start: () => void;
  destroy: () => void;
};

type GsapApi = typeof import("gsap").gsap;
type ScrollTriggerApi = typeof import("gsap/ScrollTrigger").ScrollTrigger;
type SplitTextApi = typeof import("gsap/SplitText").SplitText;
type ScrollRuntime = { gsap: GsapApi; ScrollTrigger: ScrollTriggerApi; SplitText: SplitTextApi | null; lenis: LenisController };
type ScrollEffectsValue = { lenis: LenisController | null; acquireScrollLock: () => () => void };
type TweenHandle = { kill: () => void };

const ScrollEffectsContext = createContext<ScrollEffectsValue | null>(null);
let pluginsRegistered = false;

export function useScrollEffects() {
  return useContext(ScrollEffectsContext);
}

export function ScrollEffects({ children }: { children: ReactNode }) {
  const { mode, ready } = useMotionSetting();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [runtime, setRuntime] = useState<ScrollRuntime | null>(null);
  const lenisRef = useRef<LenisController | null>(null);
  const lockCount = useRef(0);

  const acquireScrollLock = useCallback(() => {
    lockCount.current += 1;
    lenisRef.current?.stop();
    let released = false;
    return () => {
      if (released) return;
      released = true;
      lockCount.current = Math.max(0, lockCount.current - 1);
      if (!lockCount.current && !document.hidden) lenisRef.current?.start();
    };
  }, []);

  useEffect(() => {
    if (!ready || mode === "reduced") {
      setRuntime(null);
      lenisRef.current = null;
      return;
    }

    let cancelled = false;
    let lenis: LenisController | null = null;
    let gsap: GsapApi | null = null;
    let ScrollTrigger: ScrollTriggerApi | null = null;
    let updateScrollTrigger: (() => void) | null = null;
    let onVisibilityChange: (() => void) | null = null;
    let ticker: ((time: number) => void) | null = null;
    let refreshTimer: ReturnType<typeof setTimeout> | null = null;
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    let introObserver: MutationObserver | null = null;

    const scheduleRefresh = (delay = 300) => {
      if (refreshTimer) clearTimeout(refreshTimer);
      refreshTimer = setTimeout(() => ScrollTrigger?.refresh(), delay);
    };

    const onImageLoad = (event: Event) => {
      if (event.target instanceof HTMLImageElement) scheduleRefresh();
    };
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => scheduleRefresh(0), 300);
    };

    void Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
      import("lenis"),
      import("gsap/SplitText").catch(() => null),
    ]).then(([gsapModule, triggerModule, lenisModule, splitModule]) => {
      if (cancelled) return;
      gsap = gsapModule.gsap;
      ScrollTrigger = triggerModule.ScrollTrigger;
      const SplitText = splitModule?.SplitText ?? null;
      if (!pluginsRegistered) {
        gsap.registerPlugin(ScrollTrigger);
        if (SplitText) gsap.registerPlugin(SplitText);
        pluginsRegistered = true;
      }
      ScrollTrigger.config({ ignoreMobileResize: true });

      const instance = new lenisModule.default({ lerp: 0.08, smoothWheel: true }) as LenisController;
      lenis = instance;
      lenisRef.current = instance;
      updateScrollTrigger = () => ScrollTrigger?.update();
      instance.on("scroll", updateScrollTrigger);
      ticker = (time) => instance.raf(time * 1000);
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);
      if (lockCount.current) instance.stop();

      onVisibilityChange = () => {
        if (document.hidden) {
          instance.stop();
          gsap?.ticker.sleep();
        } else {
          if (!lockCount.current) instance.start();
          gsap?.ticker.wake();
          scheduleRefresh(0);
        }
      };
      document.addEventListener("visibilitychange", onVisibilityChange);
      document.addEventListener("load", onImageLoad, true);
      window.addEventListener("resize", onResize, { passive: true });

      if (document.fonts?.ready) {
        void document.fonts.ready.then(() => {
          if (!cancelled) scheduleRefresh(0);
        });
      }
      if (document.querySelector(".opening-scene")) {
        introObserver = new MutationObserver(() => {
          if (!document.querySelector(".opening-scene")) {
            scheduleRefresh(0);
            introObserver?.disconnect();
          }
        });
        introObserver.observe(document.body, { childList: true, subtree: true });
      }

      requestAnimationFrame(() => scheduleRefresh(0));
      setRuntime({ gsap, ScrollTrigger, SplitText, lenis: instance });
    }).catch(() => {
      if (!cancelled) setRuntime(null);
    });

    return () => {
      cancelled = true;
      if (refreshTimer) clearTimeout(refreshTimer);
      if (resizeTimer) clearTimeout(resizeTimer);
      introObserver?.disconnect();
      document.removeEventListener("load", onImageLoad, true);
      if (onVisibilityChange) document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("resize", onResize);
      if (lenis && gsap && ScrollTrigger) {
        if (updateScrollTrigger) lenis.off("scroll", updateScrollTrigger);
        if (ticker) gsap.ticker.remove(ticker);
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        lenis.destroy();
      }
      if (lenisRef.current === lenis) lenisRef.current = null;
      setRuntime(null);
    };
  }, [mode, ready]);

  useEffect(() => {
    if (!runtime || mode === "reduced") return;
    const { gsap, ScrollTrigger, SplitText } = runtime;
    const root = document.documentElement;
    const playedText = new WeakSet<HTMLElement>();
    const splitInstances: Array<{ kill: () => void; revert: () => void }> = [];
    const splitRunners: Array<() => void> = [];
    const fallbackTargets: HTMLElement[] = [];
    const fallbackTriggers = new Map<HTMLElement, { kill: () => void }>();
    const originalAriaLabels = new Map<HTMLElement, string | null>();
    const activeTweens: TweenHandle[] = [];
    const context = gsap.context(() => {}, document.body);
    let mediaQueries: { revert: () => void } | null = null;
    let splitResizeTimer: ReturnType<typeof setTimeout> | null = null;

    const finishElement = (element: HTMLElement) => {
      gsap.set(element, { autoAlpha: 1, y: 0, clearProps: "filter,willChange,transform,opacity,visibility" });
    };

    const fadeElement = (element: HTMLElement) => {
      if (playedText.has(element) || element.getBoundingClientRect().top < window.innerHeight * 0.88) {
        playedText.add(element);
        finishElement(element);
        return;
      }
      gsap.set(element, { autoAlpha: 0, y: 18, willChange: "transform,opacity" });
      ScrollTrigger.create({
        trigger: element,
        start: "top 88%",
        once: true,
        toggleActions: "play none none none",
        onEnter: () => {
          playedText.add(element);
          activeTweens.push(gsap.to(element, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out", clearProps: "transform,opacity,visibility,willChange" }));
        },
      });
    };

    const wordFallback = (element: HTMLElement, originalText = element.textContent ?? "", record = true) => {
      fallbackTriggers.get(element)?.kill();
      const screenReaderText = document.createElement("span");
      screenReaderText.className = "sr-only";
      screenReaderText.textContent = originalText;
      const visual = document.createElement("span");
      visual.className = "scroll-word-visual";
      visual.setAttribute("aria-hidden", "true");
      const words: HTMLElement[] = [];
      for (const token of originalText.match(/\S+|\s+/g) ?? []) {
        if (/^\s+$/.test(token)) {
          visual.append(document.createTextNode(token));
          continue;
        }
        const mask = document.createElement("span");
        mask.className = "scroll-word-mask";
        const word = document.createElement("span");
        word.className = "scroll-word";
        word.textContent = token;
        mask.append(word);
        visual.append(mask);
        words.push(word);
      }
      element.replaceChildren(screenReaderText, visual);
      if (record && !fallbackTargets.includes(element)) fallbackTargets.push(element);
      if (playedText.has(element) || element.getBoundingClientRect().top < window.innerHeight * 0.88) {
        playedText.add(element);
        gsap.set(words, { yPercent: 0, autoAlpha: 1 });
        return;
      }
      gsap.set(words, { yPercent: 100, autoAlpha: 0 });
      const trigger = ScrollTrigger.create({
        trigger: element,
        start: "top 88%",
        once: true,
        toggleActions: "play none none none",
        onEnter: () => {
          playedText.add(element);
          activeTweens.push(gsap.to(words, { yPercent: 0, autoAlpha: 1, duration: 0.9, stagger: 0.12, ease: "power2.out", clearProps: "transform,opacity" }));
        },
      });
      fallbackTriggers.set(element, trigger);
    };

    const setupTextReveals = () => {
      const textTargets = gsap.utils.toArray<HTMLElement>("[data-scroll-text], main > section.parchment p");
      textTargets.forEach((element) => {
        if (element.querySelector("mark, a, span") || element.children.length) {
          fadeElement(element);
          return;
        }
        const originalText = element.textContent ?? "";
        if (SplitText) {
          originalAriaLabels.set(element, element.getAttribute("aria-label"));
          element.setAttribute("aria-label", originalText);
          const onSplit = (result: InstanceType<SplitTextApi>) => {
            result.lines.forEach((line) => {
              line.setAttribute("aria-hidden", "true");
              const mask = line.parentElement;
              if (mask && mask !== element) {
                mask.style.paddingBottom = "0.2em";
                mask.style.marginBottom = "-0.2em";
              }
            });
            if (playedText.has(element) || element.getBoundingClientRect().top < window.innerHeight * 0.88) {
              playedText.add(element);
              gsap.set(result.lines, { yPercent: 0, autoAlpha: 1 });
              return;
            }
            gsap.set(result.lines, { yPercent: 100, autoAlpha: 0 });
            const tween = gsap.fromTo(result.lines, { yPercent: 100, autoAlpha: 0 }, {
              yPercent: 0,
              autoAlpha: 1,
              duration: 0.9,
              stagger: 0.12,
              ease: "power2.out",
              scrollTrigger: {
                trigger: element,
                start: "top 88%",
                once: true,
                toggleActions: "play none none none",
                onEnter: () => playedText.add(element),
              },
            });
            activeTweens.push(tween);
            return tween;
          };
          const splitOptions = { type: "lines", mask: "lines" as const, autoSplit: true, onSplit };
          const split = SplitText.create(element, splitOptions);
          splitInstances.push(split);
          splitRunners.push(() => { split.split(splitOptions); });
        } else {
          wordFallback(element);
        }
      });
    };

    context.add(() => {
      setupTextReveals();

      const chapterPages = gsap.utils.toArray<HTMLElement>(".page-in:not(.is-in)");
      if (chapterPages.length) ScrollTrigger.batch(chapterPages, {
        start: "top 94%",
        once: true,
        onEnter: (batch: HTMLElement[]) => batch.forEach((element) => element.classList.add("is-in")),
      });

      const revealElements = gsap.utils.toArray<HTMLElement>('[data-scroll-reveal="rise"]');
      const revealPending = revealElements.filter((element) => element.getBoundingClientRect().top >= window.innerHeight * 0.94);
      const revealPassed = revealElements.filter((element) => !revealPending.includes(element));
      gsap.set(revealPassed, { autoAlpha: 1, y: 0 });
      gsap.set(revealPending, { autoAlpha: 0, y: 24, willChange: "transform,opacity" });
      if (revealPending.length) ScrollTrigger.batch(revealPending, {
        start: "top 94%",
        once: true,
        onEnter: (batch: HTMLElement[]) => {
          activeTweens.push(gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.06, ease: "power2.out", clearProps: "transform,opacity,visibility,willChange" }));
        },
      });

      const imageFrames = gsap.utils.toArray<HTMLElement>("[data-scroll-image]");
      const imagesPending = imageFrames.filter((element) => element.getBoundingClientRect().top >= window.innerHeight * 0.9);
      gsap.set(imageFrames.filter((element) => !imagesPending.includes(element)), { clipPath: "inset(0% 0 0 0)" });
      gsap.set(imagesPending, { clipPath: "inset(100% 0 0 0)" });
      if (imagesPending.length) ScrollTrigger.batch(imagesPending, {
        start: "top 90%",
        once: true,
        onEnter: (batch: HTMLElement[]) => {
          activeTweens.push(gsap.to(batch, { clipPath: "inset(0% 0 0 0)", duration: 1, stagger: 0.1, ease: "power3.out", clearProps: "clipPath" }));
        },
      });

      const highlightMarks = gsap.utils.toArray<HTMLElement>(".text-highlight");
      if (highlightMarks.length) ScrollTrigger.batch(highlightMarks, {
        start: "top center+=100",
        once: true,
        onEnter: (batch: HTMLElement[]) => batch.forEach((mark) => mark.classList.add("active")),
      });

      const progressFill = document.querySelector<HTMLElement>("[data-scroll-progress-fill]");
      if (progressFill) {
        gsap.set(progressFill, { scaleX: 0, transformOrigin: "left center" });
        activeTweens.push(gsap.to(progressFill, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: true },
        }));
      }

      const chapterContent = gsap.utils.toArray<HTMLElement>("[data-scroll-blur]");
      const media = gsap.matchMedia();
      mediaQueries = media;
      const animateBlur = (withBlur: boolean) => chapterContent.forEach((element) => {
        let scrubTween: { progress: () => number; kill: () => void } | null = null;
        scrubTween = gsap.fromTo(element,
          { autoAlpha: 0, y: 36, filter: withBlur ? "blur(10px)" : "none", willChange: "transform,opacity" },
          {
            autoAlpha: 1,
            y: 0,
            filter: withBlur ? "blur(0px)" : "none",
            willChange: "transform,opacity,filter",
            ease: "power2.inOut",
            scrollTrigger: { trigger: element, start: "top 92%", end: "top 55%", scrub: 1 },
            onUpdate: () => {
              const progress = scrubTween?.progress() ?? 0;
              const complete = progress >= 1;
              element.style.willChange = complete ? "" : "transform,opacity,filter";
              element.style.filter = withBlur && !complete ? `blur(${10 * (1 - progress)}px)` : "none";
            },
          },
        );
        if (scrubTween) activeTweens.push(scrubTween);
      });
      media.add("(min-width: 768px)", () => animateBlur(true));
      media.add("(max-width: 767px)", () => animateBlur(false));

      const socialRow = document.querySelector<HTMLElement>(".social-row");
      const socialIcons = socialRow ? gsap.utils.toArray<HTMLElement>(".social-icon-reveal", socialRow) : [];
      if (socialRow && socialIcons.length) {
        if (socialRow.getBoundingClientRect().top < window.innerHeight - 100) gsap.set(socialIcons, { autoAlpha: 1, y: 0, filter: "none" });
        else {
          gsap.set(socialIcons, { autoAlpha: 0, y: 40, filter: "blur(8px)", willChange: "transform,opacity,filter" });
          activeTweens.push(gsap.to(socialIcons, {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.2,
            stagger: 0.08,
            ease: "power2.out",
            clearProps: "transform,opacity,visibility,filter,willChange",
            scrollTrigger: { trigger: socialRow, start: "top bottom-=100", once: true, toggleActions: "play none none none" },
          }));
        }
      }

      const contactCard = document.querySelector<HTMLElement>("[data-scroll-contact]");
      if (contactCard) {
        if (contactCard.getBoundingClientRect().top < window.innerHeight * 0.94) gsap.set(contactCard, { autoAlpha: 1, y: 0 });
        else activeTweens.push(gsap.fromTo(contactCard, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out", clearProps: "transform,opacity,visibility", scrollTrigger: { trigger: contactCard, start: "top 94%", once: true } }));
      }

      const parallax = gsap.matchMedia();
      mediaQueries = { revert: () => { parallax.revert(); media.revert(); } };
      parallax.add("(min-width: 768px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-scroll-parallax]").forEach((element) => {
          const depth = Number(element.dataset.scrollParallax ?? 0);
          gsap.fromTo(element, { yPercent: -depth }, {
            yPercent: depth,
            ease: "none",
            scrollTrigger: { trigger: element.closest(".story-hero") ?? element, start: "top bottom", end: "bottom top", scrub: 1 },
          });
        });
      });
    });

    document.querySelectorAll<HTMLElement>(".page-in").forEach((element) => {
      if (element.getBoundingClientRect().top < window.innerHeight * 0.94) element.classList.add("is-in");
    });
    root.dataset.scrollReady = "true";

    const onResize = () => {
      if (splitResizeTimer) clearTimeout(splitResizeTimer);
      splitResizeTimer = setTimeout(() => {
        splitRunners.forEach((split) => split());
        fallbackTargets.forEach((element) => {
          const originalText = element.querySelector<HTMLElement>(".sr-only")?.textContent;
          if (originalText !== null && originalText !== undefined) wordFallback(element, originalText, false);
        });
        ScrollTrigger.refresh();
      }, 400);
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      if (splitResizeTimer) clearTimeout(splitResizeTimer);
      activeTweens.forEach((tween) => tween.kill());
      fallbackTriggers.forEach((trigger) => trigger.kill());
      mediaQueries?.revert();
      splitInstances.forEach((split) => {
        split.kill();
        split.revert();
      });
      originalAriaLabels.forEach((ariaLabel, element) => {
        if (ariaLabel === null) element.removeAttribute("aria-label");
        else element.setAttribute("aria-label", ariaLabel);
      });
      fallbackTargets.forEach((element) => {
        const original = element.querySelector<HTMLElement>(".sr-only")?.textContent;
        if (original !== null && original !== undefined) element.textContent = original;
      });
      context.revert();
      document.querySelectorAll<HTMLElement>(".page-in").forEach((element) => element.classList.add("is-in"));
      gsap.set(gsap.utils.toArray<HTMLElement>('[data-scroll-reveal="rise"], [data-scroll-blur], [data-scroll-text], [data-scroll-contact]'), {
        autoAlpha: 1,
        y: 0,
        filter: "none",
        clearProps: "transform,opacity,visibility,filter,willChange",
      });
      gsap.set(gsap.utils.toArray<HTMLElement>("[data-scroll-image]"), { clipPath: "inset(0% 0 0 0)", clearProps: "clipPath" });
      delete root.dataset.scrollReady;
    };
  }, [runtime, mode, pathname]);

  return (
    <ScrollEffectsContext.Provider value={{ lenis: runtime?.lenis ?? null, acquireScrollLock }}>
      <div className="scroll-progress-ribbon" aria-hidden="true"><span data-scroll-progress-fill /></div>
      {children}
    </ScrollEffectsContext.Provider>
  );
}