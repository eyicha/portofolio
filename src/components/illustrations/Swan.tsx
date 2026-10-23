import { ArtFrame, type ArtProps } from "./ArtFrame";
export function Swan({ variant, ...props }: ArtProps) {
  return <ArtFrame name="Swan" viewBox="0 0 260 180" transparentGrain {...props}>{id => <>
    <defs><linearGradient id={`${id}-swan`} x1=".2" y1="0" x2=".7" y2="1"><stop stopColor="var(--pearl)"/><stop offset=".35" stopColor="var(--cream)"/><stop offset=".68" stopColor="var(--blush)"/><stop offset="1" stopColor="var(--rose)"/></linearGradient></defs>
    <ellipse cx="141" cy="156" rx="88" ry="5" fill="var(--rose)" opacity=".15"/>
    <path d="M51 47C16 24 40 6 64 17C93 30 77 61 61 86C40 117 67 142 109 139C153 138 204 108 235 101C244 126 225 150 195 157C146 170 76 164 54 147C29 127 34 104 49 86C64 68 71 50 60 40C53 33 42 37 51 47Z" fill={`url(#${id}-swan)`} stroke="var(--blush)" strokeWidth="1.5"/>
    <path d="M72 128Q113 74 225 98Q207 143 123 150Q93 146 72 128Z" fill={`url(#${id}-swan)`} stroke="var(--pearl)" strokeWidth="2"/>
    {[0,1,2,3,4,5,6].map(i=><path key={i} d={variant === "resting" ? `M${76+i*4} ${130+i*2}Q${127+i*5} ${94+i*6} ${224-i*7} ${103+i*5}Q${185-i*3} 151 ${76+i*4} ${130+i*2}` : `M${76+i*4} ${130+i*2}Q${110+i*9} ${55+i*9} ${221-i*7} ${83+i*8}Q185 150 ${76+i*4} ${130+i*2}`} fill={`url(#${id}-swan)`} stroke="var(--rose)" strokeOpacity=".45" strokeWidth=".8"/>)}
    <path d="M48 28L28 35L49 39Z" fill={`url(#${id}-gold)`}/><path d="M47 29L44 39" stroke="var(--plum)" strokeWidth="3"/><circle cx="57" cy="28" r="2" fill="var(--plum)"/><circle cx="57.6" cy="27.5" r=".6" fill="var(--pearl)"/>
    <path d="M61 42Q79 58 55 91Q39 119 66 139M83 143Q147 164 209 140" fill="none" stroke="var(--pearl)" strokeWidth="2.5" opacity=".85"/>
    <g className="wing-shimmer" fill="var(--foil-light)"><path d="M60 5L62 11L68 13L62 15L60 21L58 15L52 13L58 11Z"/>{[120,153,189,212].map((x,i)=><path key={x} d={`M${x} ${105+i*3}l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5Z`}/>)}</g>
    <g fill="var(--pearl)" opacity=".8"><circle cx="21" cy="152" r="1.5"/><path d="M34 150l1 3 3 1-3 1-1 3-1-3-3-1 3-1Z"/><circle cx="248" cy="151" r="1.2"/></g>
  </>}</ArtFrame>;
}