'use client';
import { motion } from "framer-motion";
export default function ProfileLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="no-scrollbar h-full w-full"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        delay: 0.5,
      }}
    >
      {children}
    </motion.div>
  );
}
