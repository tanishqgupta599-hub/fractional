"use client";

import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, children, ...props }, ref) => {
    const CardContent = (
      <div
        ref={ref}
        className={cn(
          "glass-card relative overflow-hidden group",
          hover && "cursor-pointer",
          className
        )}
        {...props}
      >
        {/* Subtle Gradient Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />
        
        {/* Content */}
        <div className="relative z-10 h-full">
          {children}
        </div>
      </div>
    );

    if (hover) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.4 }}
        >
          {CardContent}
        </motion.div>
      );
    }

    return CardContent;
  }
);
Card.displayName = "Card";

export { Card };
