import Link from "next/link";
import { ReactNode } from "react";

interface AnimatedButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "accent";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function AnimatedButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
}: AnimatedButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-poppins font-black text-xs uppercase tracking-widest py-4 px-8 rounded-full transition-all duration-300 transform-gpu active:scale-[0.97] hover:scale-[1.03]";

  const variantClasses = {
    primary: "bg-primary text-[#051421] hover:bg-[#00a3e0] shadow-lg shadow-primary/20",
    secondary: "border border-white/20 hover:border-primary/55 hover:bg-white/5 text-white",
    accent: "bg-accent text-[#051421] hover:bg-[#ffc81f] shadow-lg shadow-accent/20",
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
    >
      {children}
    </button>
  );
}
