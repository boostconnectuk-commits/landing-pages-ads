import type { ReactNode } from "react";

export default function QuestionLayout({
  indicator,
  title,
  subtext,
  children,
}: {
  indicator: string;
  title: string;
  subtext?: string;
  children: ReactNode;
}) {
  return (
    <div className="max-w-2xl mx-auto w-full px-6 md:px-8 py-16 md:py-24">
      <span className="block text-center text-xs uppercase tracking-wider text-primary-teal mb-4">
        {indicator}
      </span>
      <h1 className="font-serif font-normal text-3xl md:text-4xl text-charcoal leading-tight text-center max-w-xl mx-auto mb-12">
        {title}
      </h1>
      {subtext && (
        <p className="text-base text-warm-grey text-center -mt-8 mb-12">{subtext}</p>
      )}
      {children}
    </div>
  );
}
