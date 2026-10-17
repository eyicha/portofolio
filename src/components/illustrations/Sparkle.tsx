import { ArtFrame, type ArtProps } from "./ArtFrame";
export function Sparkle({ variant, ...props }: ArtProps) { return <ArtFrame name="Sparkle" viewBox="0 0 80 80" {...props}>{id => <><path d="M40 2Q43 32 78 40Q47 43 40 78Q34 45 2 40Q35 34 40 2Z" fill={`url(#${id}-paper)`} stroke={`url(#${id}-gold)`}/><path d="M40 14V66M14 40H66" stroke="var(--pearl)"/></>}</ArtFrame>; }
