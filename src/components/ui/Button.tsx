import clsx from "clsx";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type BaseProps = {
  variant?: "solid" | "ghost" | "muted";
  size?: "sm" | "md" | "lg";
};

type ButtonProps = BaseProps &
  (
    | (ButtonHTMLAttributes<HTMLButtonElement> & { href?: never })
    | (AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })
  );

const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline focus-visible:outline-2";

const variants = {
  solid: "bg-black text-white hover:bg-zinc-900",
  ghost: "border border-current text-current bg-transparent hover:bg-black/10",
  muted: "bg-zinc-200 text-black hover:bg-zinc-300",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-5 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export function Button(props: ButtonProps) {
  const { variant = "solid", size = "md", href, className, ...rest } = props as ButtonProps & {
    className?: string;
  };
  const resolvedClassName = clsx(baseStyles, variants[variant], sizes[size], className);

  if (href) {
    return <a className={resolvedClassName} href={href} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} />;
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return <button className={resolvedClassName} type={buttonProps.type ?? "button"} {...buttonProps} />;
}
