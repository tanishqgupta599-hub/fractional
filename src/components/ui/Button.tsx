"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden",
          {
            "bg-gradient-to-r from-primary via-primary/80 to-primary text-black hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] border border-primary/50": variant === "primary",
            "bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]": variant === "secondary",
            "border border-white/20 bg-transparent text-white hover:bg-white/5 hover:border-primary/50": variant === "outline",
            "bg-transparent text-white hover:bg-white/5": variant === "ghost",
            "h-10 px-5 text-sm": size === "sm",
            "h-12 px-7 text-base": size === "md",
            "h-16 px-10 text-lg": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
