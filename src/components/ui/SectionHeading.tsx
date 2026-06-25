import { motion } from "framer-motion";

interface SectionHeadingProps {
  tagline: string;
  titleNormal: string;
  titleGradient: string;
  description?: string;
  centered?: boolean;
  headingRef?: React.RefObject<HTMLHeadingElement | null>;
}

export default function SectionHeading({
  tagline,
  titleNormal,
  titleGradient,
  description,
  centered = true,
  headingRef,
}: SectionHeadingProps) {
  return (
    <div className={`mb-14 ${centered ? "text-center max-w-2xl mx-auto" : "text-left"}`}>
      <span className="text-xs tracking-[0.3em] uppercase text-primary font-bold block">
        {tagline}
      </span>
      <h2
        ref={headingRef}
        className="text-3xl md:text-5xl font-poppins font-black uppercase text-white mt-2 leading-tight"
      >
        {titleNormal} <span className="text-gradient">{titleGradient}</span>
      </h2>
      {description && (
        <p className="text-white/55 font-inter text-sm md:text-base mt-4 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
