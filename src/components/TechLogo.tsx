import { useState } from "react";
import { Activity, Braces, Database, FileSpreadsheet, Layers, Palette, Server, type LucideIcon } from "lucide-react";
import { techLogos } from "@/data/tech-logos";

const fallbackIcons: Record<string, LucideIcon> = {
  "Microsoft Excel": FileSpreadsheet,
  Blade: Layers,
  Canva: Palette,
  Matplotlib: Activity,
  SQL: Database,
  "REST API": Braces,
  Laragon: Server,
};

export function TechLogo({ name, monogram }: { name: string; monogram: string }) {
  const [localImageLoaded, setLocalImageLoaded] = useState(false);
  const [localImageFailed, setLocalImageFailed] = useState(false);
  const entry = techLogos[name];
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const isLaragon = name === "Laragon";
  const isMysql = name === "MySQL";
  const FallbackIcon = fallbackIcons[name];
  const localSource = isLaragon
    ? "https://raw.githubusercontent.com/leokhoa/laragon/master/bin/laragon/res/laragon-on.png"
    : `/logos/${slug}.svg`;
  const logoLabel = isLaragon ? "Laragon" : `${name} logo`;

  return (
    <span className={`tech-logo${name === "PHP" ? " tech-logo-wordmark" : ""}`}>
      {isLaragon && <img src={localSource} alt={logoLabel} aria-label={logoLabel} className={`tech-logo-local ${localImageLoaded ? "is-loaded" : ""} is-laragon`} onLoad={() => setLocalImageLoaded(true)} onError={() => setLocalImageFailed(true)} />}
      {isMysql && entry?.icon && <svg viewBox="0 0 24 24" role="img" aria-label={logoLabel} className="tech-logo-svg tech-logo-svg-mysql"><path d={entry.icon.path} fill="#FFFFFF" /></svg>}
      {!isMysql && !isLaragon && entry?.icon && <svg viewBox="0 0 24 24" role="img" aria-label={logoLabel} className={`tech-logo-svg${name === "PHP" ? " tech-logo-svg-wordmark" : ""}`}><path d={entry.icon.path} fill="#FFFFFF" /></svg>}
      {!isMysql && !entry?.icon && FallbackIcon && (!isLaragon || localImageFailed) && <FallbackIcon role="img" aria-label={logoLabel} className="tech-logo-fallback" />}
      {!isMysql && !entry?.icon && !FallbackIcon && <span role="img" aria-label={logoLabel} className="tech-logo-monogram">{monogram}</span>}
    </span>
  );
}