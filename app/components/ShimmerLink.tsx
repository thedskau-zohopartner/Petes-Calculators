"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge tailwind classes
 */
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ShimmerLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    target?: string;
    rel?: string;
}

const ShimmerLink = ({
    href,
    children,
    className,
    target,
    rel,
}: ShimmerLinkProps) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
        >
            <Link
                href={href}
                target={target}
                rel={rel}
                className={cn(
                    "relative overflow-hidden group flex items-center justify-center",
                    "w-[250px] h-[56px] rounded-2xl transition-all duration-200",
                    "bg-[#080808] text-white font-medium text-base",
                    "border-2 border-white/20",
                    className
                )}
            >
                {/* Shimmer Effect Layer */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <motion.div
                        initial={{ x: "-150%" }}
                        animate={{
                            x: "150%",
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    />
                </div>

                {/* Subtle Glow Hover Effect */}
                <div className="absolute inset-0 bg-linear-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Link Content */}
                <span className="relative z-10 flex items-center justify-center gap-2 drop-shadow-sm">
                    {children}
                </span>
            </Link>
        </motion.div>
    );
};

export default ShimmerLink;
