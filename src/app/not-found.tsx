import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-bolt flex-col items-center justify-center px-5 py-24 text-center md:px-10">
      <p className="seam-mark spec mb-6 justify-center">404</p>
      <h1 className="font-display text-5xl leading-tight text-ink md:text-6xl">
        Cut from a different cloth.
      </h1>
      <p className="mt-5 max-w-sm text-base leading-relaxed text-slate">
        That page isn&apos;t in the house. Let&apos;s get you back to the rack.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block bg-ink px-7 py-3 font-mono text-[11px] uppercase tracking-spec text-paper"
        data-cursor="Home"
      >
        Return home
      </Link>
    </div>
  );
}
