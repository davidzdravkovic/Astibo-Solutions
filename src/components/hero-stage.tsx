"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";

/**
 * Animated product stage for the home hero — danub.io-style floating panel,
 * built from Astibo product surfaces (messaging + live progress), not generic
 * SaaS charts.
 */

const messages = [
  { who: "alex", side: "in" as const, text: "Can we ship the first version Friday?" },
  { who: "you", side: "out" as const, text: "Scope is locked. Demo tomorrow." },
  { who: "alex", side: "in" as const, text: "Presence and receipts look solid." },
];

const bars = [
  { label: "Pending", value: 42, tone: "pending" as const },
  { label: "Completed", value: 71, tone: "done" as const },
  { label: "Cancelled", value: 18, tone: "drop" as const },
];

const chart = [
  { h: 38, tone: "a" },
  { h: 62, tone: "b" },
  { h: 48, tone: "c" },
  { h: 84, tone: "d" },
  { h: 56, tone: "e" },
  { h: 72, tone: "a" },
  { h: 44, tone: "b" },
];

export function HeroStage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const tick = () => {
      const cur = currentRef.current;
      const tgt = targetRef.current;
      cur.x += (tgt.x - cur.x) * 0.08;
      cur.y += (tgt.y - cur.y) * 0.08;
      const panel = panelRef.current;
      if (panel) {
        panel.style.setProperty("--tilt-x", `${cur.y.toFixed(2)}deg`);
        panel.style.setProperty("--tilt-y", `${cur.x.toFixed(2)}deg`);
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const root = rootRef.current;
    if (!root) return;
    const rect = root.getBoundingClientRect();
    const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    targetRef.current = { x: nx * 6, y: -ny * 4 };
  };

  const onPointerLeave = () => {
    targetRef.current = { x: 0, y: 0 };
  };

  return (
    <div
      ref={rootRef}
      className="hero-stage"
      aria-hidden="true"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div className="hero-stage__glow" />
      <div ref={panelRef} className="hero-stage__panel">
        <div className="hero-stage__chrome">
          <span />
          <span />
          <span />
          <p className="hero-stage__title">astibo · live surfaces</p>
        </div>

        <div className="hero-stage__body">
          <div className="hero-stage__chat">
            <p className="hero-stage__label">ChatMe · delivery path</p>
            <ul className="hero-stage__msgs">
              {messages.map((msg, index) => (
                <li
                  key={msg.text}
                  className={`hero-stage__msg hero-stage__msg--${msg.side}`}
                  style={{ animationDelay: `${700 + index * 550}ms` }}
                >
                  <span className="hero-stage__who">{msg.who}</span>
                  <span className="hero-stage__bubble">{msg.text}</span>
                </li>
              ))}
            </ul>
            <p className="hero-stage__typing">
              <span />
              <span />
              <span />
            </p>
          </div>

          <div className="hero-stage__side">
            <div className="hero-stage__progress">
              <p className="hero-stage__label">Hardliq · this week</p>
              <ul>
                {bars.map((bar, index) => (
                  <li key={bar.label}>
                    <div className="hero-stage__bar-meta">
                      <span>{bar.label}</span>
                      <span>{bar.value}%</span>
                    </div>
                    <div className="hero-stage__track">
                      <div
                        className={`hero-stage__fill hero-stage__fill--${bar.tone}`}
                        style={
                          {
                            "--bar": `${bar.value}%`,
                            animationDelay: `${1200 + index * 280}ms`,
                          } as CSSProperties
                        }
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hero-stage__chart">
              <p className="hero-stage__label">FitCore · activity</p>
              <div className="hero-stage__columns">
                {chart.map((col, index) => (
                  <span
                    key={`${col.tone}-${index}`}
                    className={`hero-stage__col hero-stage__col--${col.tone}`}
                    style={
                      {
                        "--col-h": `${col.h}%`,
                        animationDelay: `${1600 + index * 90}ms`,
                      } as CSSProperties
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
