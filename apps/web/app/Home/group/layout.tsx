'use client';

import { motion } from "framer-motion";
export default function groupLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="no-scrollbar h-full w-full"
      initial={{
        x: -900,
      }}
      animate={{
        x: 0,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        delay: 0.1,
      }}
    >
      {children}
    </motion.div>
  );
}
