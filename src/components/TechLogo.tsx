import { useState } from "react";
import { techLogos } from "@/data/tech-logos";

export function TechLogo({ name, monogram }: { name: string; monogram: string }) {
  const [localImageLoaded, setLocalImageLoaded] = useState(false);
  const [localImageFailed, setLocalImageFailed] = useState(false);
  const entry = techLogos[name];
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const isLaragon = name === "Laragon";
  const localSource = isLaragon ? "/logos/laragon.png" : `/logos/${slug}.svg`;
  const logoLabel = isLaragon ? "Laragon" : `${name} logo`;

  return (
    <span className="tech-logo">
      <img src={localSource} alt={logoLabel} aria-label={logoLabel} className={`tech-logo-local ${localImageLoaded ? "is-loaded" : ""} ${isLaragon ? "is-laragon" : ""}`} onLoad={() => setLocalImageLoaded(true)} onError={() => setLocalImageFailed(true)} />
      {!localImageLoaded && !localImageFailed && entry?.icon && <svg viewBox="0 0 24 24" role="img" aria-label={logoLabel} className="tech-logo-svg"><path d={entry.icon.path} fill="#FFFFFF" /></svg>}
      {!localImageLoaded && (localImageFailed || !entry?.icon) && <span role="img" aria-label={logoLabel} className="tech-logo-monogram">{isLaragon ? "L" : monogram}</span>}
    </span>
  );
}