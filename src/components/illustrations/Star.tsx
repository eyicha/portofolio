import { ArtFrame, type ArtProps } from "./ArtFrame";
export function Star({ variant, ...props }: ArtProps) { return <ArtFrame name="Star" viewBox="0 0 80 80" {...props}>{id => <><path d="M40 0L47 23L68 12L57 33L80 40L57 47L68 68L47 57L40 80L33 57L12 68L23 47L0 40L23 33L12 12L33 23Z" fill={`url(#${id}-gold)`} stroke="var(--pearl)"/></>}</ArtFrame>; }
