import { ReactNode, forwardRef, ForwardRefRenderFunction } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

const GlassCardRender: ForwardRefRenderFunction<HTMLDivElement, GlassCardProps> = (
  { children, className = "", onClick, hoverEffect = true },
  ref
) => {
  return (
    <div
      ref={ref}
      onClick={onClick}
      className={`glass-panel p-6 rounded-3xl border border-white/6 shadow-xl ${
        hoverEffect
          ? "transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) hover:bg-white/[0.05] hover:border-primary/25 hover:shadow-[0_20px_40px_-15px_rgba(0,184,255,0.15)] hover:-translate-y-1"
          : ""
      } ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {children}
    </div>
  );
};

export default forwardRef(GlassCardRender);
