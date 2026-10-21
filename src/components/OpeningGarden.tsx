import { useId } from "react";
import { BlossomBranch, Cloud, Petals, RoseCluster } from "./illustrations";

export function OpeningGarden() {
  const id = useId().replace(/:/g, "");
  return <div className="opening-garden" aria-hidden="true">
    <Cloud className="opening-cloud opening-cloud-one"/><Cloud className="opening-cloud opening-cloud-two"/>
    <svg className="opening-arch" viewBox="0 0 800 1100" preserveAspectRatio="none">
      <defs><linearGradient id={`${id}-stone`}><stop stopColor="var(--mauve)"/><stop offset=".5" stopColor="var(--cream)"/><stop offset="1" stopColor="var(--rose)"/></linearGradient></defs>
      <path d="M58 1100V370C58-45 742-45 742 370V1100" fill="none" stroke={`url(#${id}-stone)`} strokeWidth="72"/>
      <path d="M78 1100V370C78 0 722 0 722 370V1100" fill="none" stroke="var(--foil-light)" strokeWidth="3"/>
      <path d="M20 1070H112M688 1070H780M20 1048H112M688 1048H780" stroke="var(--cream)" strokeWidth="16"/>
    </svg>
    <div className="opening-gate opening-gate-left"><BlossomBranch className="gate-blossoms"/><RoseCluster className="gate-roses gate-roses-top"/><RoseCluster className="gate-roses gate-roses-bottom"/></div>
    <div className="opening-gate opening-gate-right"><BlossomBranch flip className="gate-blossoms"/><RoseCluster flip className="gate-roses gate-roses-top"/><RoseCluster flip className="gate-roses gate-roses-bottom"/></div>
    <div className="opening-floor"/>
    {[0,1,2,3,4,5,6,7].map(i=><Petals key={i} className={`opening-petal opening-petal-${i}`} variant={i%2 ? "curl" : undefined}/>)}
    {[0,1,2,3].map(i=><svg key={i} className={`opening-butterfly opening-butterfly-${i}`} viewBox="0 0 60 50"><path d="M30 26C6-10-9 14 10 28C-2 45 20 54 30 29C40 54 62 45 50 28C69 14 54-10 30 26Z" fill="var(--blush)" stroke="var(--deep-rose)" strokeWidth="1"/><path d="M30 18V35M27 20L23 13M33 20L37 13" stroke="var(--foil)"/><path d="M26 27L12 14M34 27L48 14" stroke="var(--pearl)"/></svg>)}
    {[0,1].map(i=><svg key={i} className={`opening-mushrooms opening-mushrooms-${i}`} viewBox="0 0 100 110"><path d="M42 44L36 100Q47 108 56 100L51 44" fill="var(--cream)" stroke="var(--rose)"/><path d="M5 48Q41-28 86 46Q44 61 5 48Z" fill="var(--rose)" stroke="var(--blush)"/><path d="M15 43Q42 0 67 28" fill="none" stroke="var(--pearl)" opacity=".6"/><path d="M78 79L76 104H87L85 78" fill="var(--cream)"/><path d="M61 79Q81 39 99 78Q82 87 61 79Z" fill="var(--deep-rose)" stroke="var(--blush)"/><g fill="var(--cream)" opacity=".8"><circle cx="35" cy="25" r="3"/><circle cx="58" cy="37" r="2"/><circle cx="25" cy="40" r="2"/></g></svg>)}
    <div className="opening-dust">{Array.from({length:16},(_,i)=><span key={i} className={`scene-dust scene-dust-${i}`}/>)}</div>
  </div>;
}