import { type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-hover shadow-sm",
  secondary:
    "bg-white text-dark border-2 border-primary hover:bg-primary-light",
  ghost:
    "bg-transparent text-dark hover:bg-gray-100",
};

export default function Button({
  variant = "primary",
  className = "",
  href,
  children,
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
