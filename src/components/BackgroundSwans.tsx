import { Swan } from "./illustrations";

export function BackgroundSwans() {
  return (
    <div className="background-swan-layer" aria-hidden="true">
      <div className="background-swan background-swan-left"><Swan variant="resting" /></div>
      <div className="background-swan background-swan-right"><Swan variant="resting" flip /></div>
    </div>
  );
}