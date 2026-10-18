import type { CSSProperties } from "react";

export function splitTitle(text: string) {
  return text.split(/(\s+)/).filter(Boolean).map(word => {
    const match = word.match(/[A-Za-zÀ-ž]/);
    const position = match?.index;
    if (position === undefined) return { initial: "", rest: word, prefix: "" };
    return { prefix: word.slice(0, position), initial: word.charAt(position).toUpperCase(), rest: word.slice(position + 1) };
  });
}

export function MixedTitle({ text, className = "", write = false }: { text: string; className?: string; write?: boolean }) {
  let index = 0;
  return <span aria-label={text} className={`mixed-title ${write ? "mixed-write" : ""} ${className}`}>
    {splitTitle(text).map((word, i) => <span aria-hidden="true" className="mixed-word" key={i}>
      {word.prefix && <span className="rest">{word.prefix}</span>}
      {word.initial && <span className="initial">{word.initial}</span>}
      <span className="rest">{write ? [...word.rest].map((letter, j) => <span className="write-letter" key={j} style={{ "--letter-index": index++ } as CSSProperties}>{letter}</span>) : word.rest}</span>
    </span>)}
  </span>;
}