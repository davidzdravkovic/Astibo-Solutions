import { capabilityTicker } from "@/content/site";

/** Slow, continuous strip of what Astibo builds. Decorative; services are listed below. */
export function CapabilityMarquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {[0, 1].map((copy) => (
          <ul key={copy} className="marquee__group">
            {capabilityTicker.map((item) => (
              <li key={item} className="marquee__item">
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
