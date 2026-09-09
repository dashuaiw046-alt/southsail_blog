type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mb-8 max-w-3xl md:mb-12">
      <p className="text-xs uppercase tracking-[0.22em] text-[var(--primary)] sm:text-sm sm:tracking-[0.25em]">
        {eyebrow}
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
