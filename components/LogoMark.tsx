// Recreates LN247's wordmark colors on a dark background: white "LN" +
// solid amber "247". LN247 hosts two logo PNGs, but neither is this
// colorway (their site header uses amber-LN/black-247 on white; the
// "reverse" asset has an outlined "247"). #FFA722 was sampled directly from
// LN247's own Play Store icon, which uses the same wordmark shape just with
// the two colors swapped — so this is their real brand color, recreated as
// crisp text/SVG instead of a mismatched raster file.
export default function LogoMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-baseline font-extrabold italic tracking-tight ${className}`}
      style={{ fontStyle: "italic" }}
    >
      <span className="text-white">LN</span>
      <span className="text-brand-amber">247</span>
    </span>
  );
}
