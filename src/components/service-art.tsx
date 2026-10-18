import { useId, type ReactNode } from "react";

/** [highlight, base, shade] — one palette per service. */
const palettes = [
  ["#f4ff9a", "#d4f52a", "#7fa100"],
  ["#a8ecff", "#1cc4ff", "#0a6aa8"],
  ["#ffa3ae", "#ff3a50", "#9c0a20"],
  ["#ffe39a", "#ffb12a", "#a85f00"],
  ["#d8c4ff", "#9a6bff", "#4f27b8"],
] as const;

function Float({
  delay,
  amount = 7,
  children,
}: {
  delay: number;
  amount?: number;
  children: ReactNode;
}) {
  return (
    <g
      className="art-float"
      style={{
        animationDelay: `${delay}s`,
        ["--float" as string]: `${amount}px`,
      }}
    >
      {children}
    </g>
  );
}

/**
 * Glossy objects that hint at each service:
 * 0 layered panels (websites) · 1 rising steps (first versions)
 * 2 overlapping shapes (design) · 3 phone (mobile) · 4 ring (review)
 */
export function ServiceArt({ index }: { index: number }) {
  const uid = useId();
  const kind = index % palettes.length;
  const [light, base, shade] = palettes[kind];
  const main = `${uid}-main`;
  const side = `${uid}-side`;
  const orb = `${uid}-orb`;
  const blur = `${uid}-blur`;

  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className="service-art">
      <defs>
        <linearGradient id={main} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={light} />
          <stop offset="55%" stopColor={base} />
          <stop offset="100%" stopColor={shade} />
        </linearGradient>
        <linearGradient id={side} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={base} />
          <stop offset="100%" stopColor={shade} />
        </linearGradient>
        <radialGradient id={orb} cx="32%" cy="28%" r="80%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="30%" stopColor={light} />
          <stop offset="75%" stopColor={base} />
          <stop offset="100%" stopColor={shade} />
        </radialGradient>
        <filter id={blur} x="-30%" y="-60%" width="160%" height="220%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      <ellipse
        cx="100"
        cy="186"
        rx="60"
        ry="7"
        fill="#000"
        opacity="0.3"
        filter={`url(#${blur})`}
      />

      {kind === 0 && (
        <g>
          <Float delay={-2.4}>
            <g transform="translate(100 138) scale(1 0.56) rotate(45)">
              <rect x="-48" y="-48" width="96" height="96" rx="16" fill={`url(#${side})`} />
            </g>
          </Float>
          <Float delay={-1.2}>
            <g transform="translate(100 108) scale(1 0.56) rotate(45)">
              <rect x="-48" y="-48" width="96" height="96" rx="16" fill={`url(#${main})`} opacity="0.95" />
            </g>
          </Float>
          <Float delay={0}>
            <g transform="translate(100 78) scale(1 0.56) rotate(45)">
              <rect x="-48" y="-48" width="96" height="96" rx="16" fill={`url(#${main})`} />
              <rect x="-48" y="-48" width="96" height="96" rx="16" fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="2" />
            </g>
          </Float>
        </g>
      )}

      {kind === 1 && (
        <g>
          <Float delay={-1.8}>
            <rect x="30" y="112" width="40" height="56" rx="14" fill={`url(#${side})`} />
          </Float>
          <Float delay={-0.9}>
            <rect x="80" y="82" width="40" height="86" rx="14" fill={`url(#${main})`} />
          </Float>
          <Float delay={0}>
            <rect x="130" y="46" width="40" height="122" rx="14" fill={`url(#${main})`} />
            <circle cx="150" cy="30" r="15" fill={`url(#${orb})`} />
          </Float>
          <path d="M40 120c0-4 3-6 7-6" stroke="#fff" strokeOpacity="0.5" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M90 90c0-4 3-6 7-6" stroke="#fff" strokeOpacity="0.5" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M140 54c0-4 3-6 7-6" stroke="#fff" strokeOpacity="0.5" strokeWidth="3" strokeLinecap="round" fill="none" />
        </g>
      )}

      {kind === 2 && (
        <g>
          <Float delay={-1.6}>
            <circle cx="72" cy="86" r="44" fill={`url(#${orb})`} />
          </Float>
          <Float delay={-0.8}>
            <rect x="92" y="88" width="72" height="72" rx="20" transform="rotate(12 128 124)" fill={`url(#${side})`} />
          </Float>
          <Float delay={0}>
            <path
              d="M118 26 L152 84 L84 84 Z"
              fill="#fff"
              fillOpacity="0.28"
              stroke="#fff"
              strokeOpacity="0.75"
              strokeWidth="6"
              strokeLinejoin="round"
            />
          </Float>
        </g>
      )}

      {kind === 3 && (
        <g>
          <Float delay={0} amount={5}>
            <rect x="62" y="22" width="76" height="152" rx="24" fill={`url(#${main})`} />
            <rect x="70" y="32" width="60" height="132" rx="16" fill="#0b1626" fillOpacity="0.5" />
            <rect x="88" y="38" width="24" height="6" rx="3" fill="#fff" fillOpacity="0.55" />
            <rect x="78" y="60" width="44" height="30" rx="8" fill="#fff" fillOpacity="0.85" />
            <rect x="78" y="100" width="44" height="8" rx="4" fill="#fff" fillOpacity="0.5" />
            <rect x="78" y="116" width="30" height="8" rx="4" fill="#fff" fillOpacity="0.35" />
          </Float>
          <Float delay={-1.5} amount={9}>
            <circle cx="152" cy="56" r="14" fill={`url(#${orb})`} />
          </Float>
          <Float delay={-0.7} amount={9}>
            <circle cx="46" cy="136" r="9" fill={`url(#${orb})`} />
          </Float>
        </g>
      )}

      {kind === 4 && (
        <g>
          <Float delay={0} amount={6}>
            <circle cx="96" cy="102" r="52" fill="none" stroke={`url(#${main})`} strokeWidth="30" />
            <path
              d="M58 76 A44 44 0 0 1 96 54"
              fill="none"
              stroke="#fff"
              strokeOpacity="0.6"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </Float>
          <Float delay={-1.2} amount={10}>
            <circle cx="152" cy="52" r="18" fill={`url(#${orb})`} />
          </Float>
        </g>
      )}
    </svg>
  );
}
