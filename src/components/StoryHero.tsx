import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import { MixedTitle } from "./MixedTitle";
import { Button } from "./ui/button";
import { Castle, Balustrade, RoseCluster, BlossomBranch, Petals, RibbonBow, Bunny, BookStack, Cloud } from "./illustrations";
import { LandingSparkles } from "./LandingSparkles";

export function StoryHero() {
  const [missing, setMissing] = useState(true);
  useEffect(() => { const photo = new Image(); photo.onerror = () => setMissing(true); photo.onload = () => { if (photo.naturalWidth > 0) setMissing(false); }; photo.src = profile.photo; return () => { photo.onerror = null; }; }, []);
  return <section id="top" className="story-hero">
    <div className="hero-sky" aria-hidden="true" />
    <LandingSparkles scene="hero" />
    <Castle className="hero-castle" variant="wide" />
    <div className="hero-parallax-layer hero-parallax-cloud" data-scroll-parallax="6"><Cloud className="hero-cloud" variant="wispy" /></div>
    <div className="hero-parallax-layer hero-parallax-blossom blossom-left" data-scroll-parallax="4"><BlossomBranch className="hero-blossom" /></div>
    <div className="hero-parallax-layer hero-parallax-blossom blossom-right" data-scroll-parallax="-4"><BlossomBranch className="hero-blossom" flip /></div>
    <div className="hero-heading">
      <span className="chapter-bookmark hero-chapter-bookmark" aria-hidden="true" />
      <p className="chapter-number-label hero-chapter-label"><span className="chapter-numeral font-script">1</span></p>
      <h1><MixedTitle text="Hi, I'm Erisa" /></h1>
      <p className="hero-intro">I turn data into stories and build the systems behind them</p>
    </div>
    <div className="hero-portrait animate-float">
      {!missing && <img src={profile.photo} alt="Portrait of Erisa Salsabila" onError={() => setMissing(true)} className="portrait-cutout" />}
      {missing && <div className="portrait-placeholder" role="img" aria-label="Pink silhouette placeholder for Erisa's portrait"><svg viewBox="0 0 260 400" aria-hidden="true"><path d="M81 115C50 39 91 4 130 5C174 3 210 47 179 116L186 150Q226 178 234 233L249 399H11L26 233Q34 178 74 150Z" fill="var(--portrait-pink)"/><ellipse cx="130" cy="80" rx="44" ry="58" fill="var(--rose)"/><path d="M90 130Q130 151 170 130L166 168Q130 185 94 168Z" fill="var(--rose)"/></svg><span>TODO portrait</span></div>}
    </div>
    <Balustrade className="hero-balustrade" />
    <div className="hero-letter">
      <div className="hero-letter-floral-frame" aria-hidden="true"><span /><span /><span /><span /></div>
      <p className="letter-caption"><MixedTitle text="About the heroine" /></p>
      {([ ["Name", profile.name], ["Role", profile.role], ["Campus", profile.campus], ["Base", profile.base] ] as const).map(([label, value]) => <p key={label} className="bio-entry"><MixedTitle text={label} className="bio-label" /><span>{value}</span></p>)}
    </div>
    <RibbonBow className="hero-bow" />
    <BookStack className="hero-books" />
    <Bunny className="hero-bunny" />
    <RoseCluster className="hero-roses roses-left" variant="foreground" />
    <RoseCluster className="hero-roses roses-right" flip />
    <div className="petal-layer" aria-hidden="true">{Array.from({ length: 7 }, (_, i) => <Petals key={i} variant={i % 2 ? "curl" : "round"} className={`falling-petal petal-${i}`} animate />)}</div>
    <div className="hero-actions"><Button asChild className="ribbon-tag"><a href="#work"><MixedTitle text="View Work" /></a></Button><Button asChild variant="outline" className="ribbon-tag ribbon-light"><a href={profile.cvUrl}><MixedTitle text="Download CV" /></a></Button></div>
  </section>;
}