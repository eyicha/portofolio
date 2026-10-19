import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { classifyInquiry } from "@/lib/inquiry.functions";
import { appendQuestion, inquirySchema, type Suggestion } from "@/lib/inquiry-schema";
import { MixedTitle } from "./MixedTitle";
import { Button } from "./ui/button";
import { Envelope, WaxSeal, PaperPlane, LaceEdge, Swan, Sparkle, RoseCluster, Cherub } from "./illustrations";

export function ContactLetter() {
  const [phase, setPhase] = useState<"writing" | "flying" | "done">("writing");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Suggestion | null>(null);
  const form = useRef<HTMLFormElement>(null);
  const suggest = useServerFn(classifyInquiry);
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
    <div className={`letter-stage letter-${phase}`}>
      <form ref={form} onSubmit={e => { e.preventDefault(); if (busy) return; const parsed = inquirySchema.safeParse(Object.fromEntries(new FormData(e.currentTarget))); if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? "Please check your letter."); return; } setError("The letter could not be sent. Please try again in a moment."); }} className="love-letter" aria-hidden={phase !== "writing"} inert={phase !== "writing"}>
        <LaceEdge className="letter-lace" />
        <p className="dear-erisa font-script">Dear Erisa,</p>
        <label><MixedTitle text="Your name" /><input name="name" required maxLength={100} autoComplete="name" /></label>
        <label><MixedTitle text="Your email" /><input name="email" type="email" required maxLength={255} autoComplete="email" /></label>
        <label><MixedTitle text="Your message" /><textarea name="message" required minLength={10} maxLength={2000} rows={4} /></label>
        <div className="letter-honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
        <div className="letter-buttons"><Button type="button" variant="outline" className="ai-letter-button" onClick={analyze} disabled={busy}><MixedTitle text={busy ? "Considering your letter" : "AI response suggestion"} /></Button><Button type="submit" className="seal-send" disabled={busy}><WaxSeal /><MixedTitle text="Seal and send" /></Button></div>
        <p className="letter-note">Email sending is awaiting setup. AI suggestions are only drafts.</p>
        <p role="alert" className="letter-error">{error}</p>
      </form>
      {phase === "flying" && <div className="letter-flight" aria-label="Your letter folds and flies away">
        <div className="flight-envelope"><Envelope /><WaxSeal className="flight-seal" /><LaceEdge className="flight-lace" /></div>
        <PaperPlane className="flight-plane" />
        <Swan className="flight-swan" variant="resting" />
        <svg aria-hidden="true" className="flight-trail" viewBox="0 0 400 500"><path d="M190 400Q385 300 175 200T250 0" stroke="var(--rose)" strokeWidth="2" fill="none"/></svg>
        <Sparkle className="flight-sparkle" animate />
        <Button variant="link" className="skip-flight" onClick={() => setPhase("done")}>Skip animation</Button>
      </div>}
      {phase === "done" && <div className="letter-finished" role="status"><PaperPlane className="finished-plane" /><p>Your email has been sent to Erisa. She would love to discuss this further, so please wait for her reply in your inbox.</p><Button variant="link" onClick={() => { setPhase("writing"); setResult(null); form.current?.reset(); }}><MixedTitle text="Write another" /></Button></div>}
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