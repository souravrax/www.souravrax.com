import React from "react";
import { Slot } from "@radix-ui/react-slot";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    const variantClasses = {
      primary: "bg-neo-yellow text-black shadow-neo-sm",
      secondary: "bg-neo-blue text-white shadow-neo-sm",
      danger: "bg-neo-red text-white shadow-neo-sm",
      ghost: "bg-transparent shadow-none border-transparent hover:bg-black/5",
    };

    const sizeClasses = {
      sm: "h-7 px-3 text-[10px]",
      md: "h-10 px-4 text-xs",
      lg: "h-12 px-6 text-sm",
      icon: "h-10 w-10 flex items-center justify-center p-0",
    };

    return (
      <Comp
        className={`inline-flex items-center justify-center whitespace-nowrap border-neo font-black uppercase tracking-tighter active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all outline-none focus-visible:ring-4 focus-visible:ring-neo-blue/50 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";