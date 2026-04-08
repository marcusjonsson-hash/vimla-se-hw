import { type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonAsButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  href?: undefined;
};

type ButtonAsLink = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: ButtonVariant;
  href: string;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-hover shadow-sm",
  secondary:
    "bg-white text-dark border-2 border-primary hover:bg-primary-light",
  ghost:
    "bg-transparent text-dark hover:bg-gray-100",
};

/**
 * Returns true for internal (same-origin) paths that should use Next.js
 * client-side navigation via <Link>.
 */
function isInternalHref(href: string): boolean {
  return href.startsWith("/") || href.startsWith("#");
}

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer ${variantClasses[variant]} ${className}`;

  if ("href" in props && props.href != null) {
    const { href, ...linkProps } = props as ButtonAsLink;

    if (isInternalHref(href)) {
      return (
        <Link href={href} className={classes} {...linkProps}>
          {children}
        </Link>
      );
    }

    return (
      <a href={href} className={classes} {...linkProps}>
        {children}
      </a>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
