/** The clapboard mark: a dark slate carrying the NotSoFlashy logo, and a striped arm hinged at the left.
    The same drawing is used big on the intro and small in the nav, so one can fly into the other.
    State lives in classes: `.open` holds the arm up, `.clapping` plays one clap. */
export default function Clapboard({ className = "", id }: { className?: string; id?: string }) {
  const clip = `armclip${id ? `-${id}` : ""}`;
  return (
    <svg className={`clap ${className}`} viewBox="0 0 40 36" aria-hidden="true" id={id}>
      <defs>
        <clipPath id={clip}><rect x="2" y="5" width="36" height="7" rx="1" /></clipPath>
        <clipPath id={`${clip}-bar`}><rect x="2" y="13" width="36" height="4.5" /></clipPath>
      </defs>
      <rect x="2.5" y="13.5" width="35" height="20" rx="1.5" fill="#0c0c0d" stroke="#ecebe7" strokeWidth="1" />
      <g clipPath={`url(#${clip}-bar)`}>
        <rect x="2" y="13" width="36" height="4.5" fill="#ecebe7" />
        <path d="M8 13l-4 4.5M16 13l-4 4.5M24 13l-4 4.5M32 13l-4 4.5M40 13l-4 4.5" stroke="#0c0c0d" strokeWidth="2.4" />
      </g>
      {/* centred on the slate face below the striped bar: x 3–37, y 17.5–33 */}
      <image href="/logos/notsoflashy-mark.png" x="6" y="18.18" width="28" height="14.14" preserveAspectRatio="xMidYMid meet" />
      <g className="arm">
        <g clipPath={`url(#${clip})`}>
          <rect x="2" y="5" width="36" height="7" fill="#0c0c0d" />
          <path d="M6 12l5-7M14 12l5-7M22 12l5-7M30 12l5-7M38 12l5-7" stroke="#ecebe7" strokeWidth="2.6" />
        </g>
        <rect x="2" y="5" width="36" height="7" rx="1" fill="none" stroke="#ecebe7" strokeWidth="1" />
        <circle cx="3.5" cy="11" r="1.6" fill="#d23a2e" />
      </g>
    </svg>
  );
}
