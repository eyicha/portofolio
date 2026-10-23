import { useEffect, useRef, useState, type RefObject } from "react";
import { useServerFn } from "@tanstack/react-start";
import { classifyInquiry } from "@/lib/inquiry.functions";
import { sendLetter } from "@/lib/send-letter.functions";
import { LETTER_SEND_ERROR } from "@/lib/send-letter-schema";
import { appendQuestion, inquirySchema, type Suggestion } from "@/lib/inquiry-schema";
import { MixedTitle } from "./MixedTitle";
import { Button } from "./ui/button";
import { Envelope, WaxSeal, PaperPlane, LaceEdge, Swan, Sparkle, RoseCluster, Cherub } from "./illustrations";
import { useMotionSetting, useScrollProgress } from "@/hooks/useMotion";

export function ContactLetter() {
  const [phase, setPhase] = useState<"writing" | "flying" | "done">("writing");
  const [busy, setBusy] = useState(false);
  const [valid, setValid] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Suggestion | null>(null);
  const form = useRef<HTMLFormElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const suggest = useServerFn(classifyInquiry);
  const send = useServerFn(sendLetter);
  const updateValidity = () => {
    if (!form.current) return;
    setValid(form.current.checkValidity() && inquirySchema.safeParse(Object.fromEntries(new FormData(form.current))).success);
  };
  const submit = async () => {
    if (busy || !form.current?.reportValidity()) return;
    const fields = Object.fromEntries(new FormData(form.current));
    const parsed = inquirySchema.safeParse(fields);
    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? LETTER_SEND_ERROR); return; }
    setBusy(true); setSending(true); setError("");
    try {
      const response = await send({ data: { ...parsed.data, website: String(fields.website ?? ""), aiSuggestion: result } });
      if (response.sent) setPhase("flying"); else setError(LETTER_SEND_ERROR);
    } catch { setError(LETTER_SEND_ERROR); }
    finally { setBusy(false); setSending(false); }
  };
  useEffect(() => {
    if (phase !== "flying") return;
    const t = setTimeout(() => setPhase("done"), matchMedia("(prefers-reduced-motion: reduce)").matches ? 150 : 3200);
    return () => clearTimeout(t);
  }, [phase]);
  const analyze = async () => {
    if (!form.current?.reportValidity()) return;
    const input = inquirySchema.safeParse(Object.fromEntries(new FormData(form.current)));
    if (!input.success) { setError(input.error.issues[0]?.message ?? "Please check your letter."); return; }
    setBusy(true); setError(""); setResult(null);
    try { const response = await suggest({ data: input.data }); if (response.error) setError(response.error); else setResult(response.result); }
    catch { setError("Your suggestion could not be completed. Please try again later."); }
    finally { setBusy(false); }
  };
  return <section id="contact" className="contact-page scroll-mt-24" aria-label="Contact Erisa">
    <div className="contact-heading"><p className="chapter-eyebrow">Epilogue</p><h2><MixedTitle text="Contact" /></h2></div>
    <Cherub className="contact-cherub" />
    <RoseCluster className="contact-rose" flip />
    <div ref={stage} className={`letter-stage letter-${phase}`}>
      <form ref={form} onInput={updateValidity} onChange={updateValidity} onSubmit={e => { e.preventDefault(); void submit(); }} className="love-letter" aria-hidden={phase !== "writing"} inert={phase !== "writing"}>
        <LaceEdge className="letter-lace" />
        <p className="dear-erisa font-script">Dear Erisa,</p>
        <label><MixedTitle text="Your name" /><input name="name" required maxLength={100} autoComplete="name" /></label>
        <label><MixedTitle text="Your email" /><input name="email" type="email" required maxLength={255} autoComplete="email" /></label>
        <label><MixedTitle text="Your message" /><textarea name="message" required minLength={10} maxLength={2000} rows={4} /></label>
        <div className="letter-honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
        <div className={`letter-seal-area ${valid ? "seal-ready" : "seal-incomplete"}`}>
          <p className="seal-hint">{sending ? "Sending your letter" : valid ? "Tap the seal to send your letter" : "Fill in the letter first"}</p>
          <Button type="submit" className="seal-send" aria-label="Seal and send letter" disabled={busy || !valid}><WaxSeal /><Sparkle className="seal-edge-sparkle"/><span className="seal-glow-ring" aria-hidden="true"/></Button>
          <p className="seal-caption"><MixedTitle text="Seal and send" /></p>
        </div>
        <div className="letter-buttons"><Button type="button" variant="outline" className="ai-letter-button" onClick={analyze} disabled={busy}><MixedTitle text={busy && !sending ? "Considering your letter" : "AI response suggestion"} /></Button></div>
        <p className="letter-note">Email sending is awaiting setup. AI suggestions are only drafts.</p>
        <p role="alert" className="letter-error">{error}</p>
      </form>
      {phase === "flying" && <div className="letter-flight" aria-label="Your letter folds and flies away">
        <div className="flight-envelope"><Envelope /><WaxSeal className="flight-seal" /><LaceEdge className="flight-lace" /></div>
        <PaperPlane className="flight-plane" />
        <FlightSwan sourceRef={stage} />
        <svg aria-hidden="true" className="flight-trail" viewBox="0 0 400 500"><path d="M190 400Q385 300 175 200T250 0" stroke="var(--rose)" strokeWidth="2" fill="none"/></svg>
        <Sparkle className="flight-sparkle" animate />
        <Button variant="link" className="skip-flight" onClick={() => setPhase("done")}>Skip animation</Button>
      </div>}
      {phase === "done" && <div className="letter-finished" role="status"><PaperPlane className="finished-plane" /><p>Your email has been sent to Erisa. She would love to discuss this further, so please wait for her reply in your inbox.</p><Button variant="link" onClick={() => { setPhase("writing"); setResult(null); setValid(false); form.current?.reset(); }}><MixedTitle text="Write another" /></Button></div>}
    </div>
    {result && <aside className="suggestion-letter" aria-live="polite"><p className="suggestion-category">AI suggestion: {result.category}</p><p>{result.summary}</p><p className="suggestion-label">Suggested follow-up questions</p><div className="suggestion-questions">{result.questions.map(question => <Button key={question} variant="outline" className="parchment-question" onClick={() => {
      const field = form.current?.elements.namedItem("message");
      if (!(field instanceof HTMLTextAreaElement)) return;
      const next = appendQuestion(field.value, question);
      if (next === null) { setError("Please shorten your message before adding a question."); return; }
      field.value = next; field.dispatchEvent(new Event("input", { bubbles: true })); field.focus(); setError("");
    }}>{question}</Button>)}</div><h3>AI draft reply (for Erisa)</h3><blockquote>{result.suggestion}</blockquote></aside>}
  </section>;
}

function FlightSwan({ sourceRef }: { sourceRef: RefObject<HTMLDivElement | null> }) {
  const ref = useRef<HTMLDivElement>(null);
  const { mode } = useMotionSetting();
  useScrollProgress(ref, mode === "full", { sourceRef, glide: true, direction: -1 });
  return <div ref={ref} className="flight-swan swan-scroll-transform"><Swan variant="resting" /></div>;
}