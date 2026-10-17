/** Small arrow marking a link that opens in a new tab, plus the same note for screen readers. */
export default function Ext() {
  return (
    <>
      <svg className="ext" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
        <path d="M6 3h7v7M13 3 4 12" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
      <span className="sr"> (opens in a new tab)</span>
    </>
  );
}
