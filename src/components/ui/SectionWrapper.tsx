import { ReactNode, ForwardRefRenderFunction, forwardRef } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
  bg?: "dark" | "blue" | "black";
  glow?: boolean;
}

const SectionWrapperRender: ForwardRefRenderFunction<HTMLDivElement, SectionWrapperProps> = (
  { children, id, className = "", bg = "dark", glow = false },
  ref
) => {
  const bgClasses = {
    dark: "bg-bg-dark",
    blue: "bg-[#051421]",
    black: "bg-[#040e18]",
  };

  return (
    <section
      id={id}
      ref={ref}
      className={`relative py-24 md:py-32 overflow-hidden border-t border-white/5 ${bgClasses[bg]} ${className}`}
    >
      {glow && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
      )}
      <div className="section-container relative z-10">{children}</div>
    </section>
  );
};

export default forwardRef(SectionWrapperRender);
export const Container = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`section-container ${className}`}>{children}</div>
);
