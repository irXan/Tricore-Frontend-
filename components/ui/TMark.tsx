/**
 * TMark — The TriCore "T" mark as a reusable SVG signature element.
 *
 * Used as: a faint watermark in dark section corners, a custom bullet/divider glyph,
 * and the calibration trace target in the loader screen.
 */

interface TMarkProps {
  className?: string;
  strokeWidth?: number;
}

export function TMark({ className, strokeWidth = 3 }: TMarkProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={className}
      aria-hidden="true"
    >
      {/* Top bar */}
      <line x1="20" y1="18" x2="80" y2="18" />
      {/* Left serif */}
      <line x1="20" y1="18" x2="20" y2="28" />
      {/* Right serif */}
      <line x1="80" y1="18" x2="80" y2="28" />
      {/* Vertical stem */}
      <line x1="50" y1="18" x2="50" y2="82" />
      {/* Bottom foot */}
      <line x1="38" y1="82" x2="62" y2="82" />
    </svg>
  );
}
