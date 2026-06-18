import React from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  xOffset?: number;
  scale?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  yOffset = 20,
  xOffset = 0,
  scale = 1,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, x: xOffset, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.16, 1, 0.3, 1], // Custom premium cubic-bezier ease out
      }}
    >
      {children}
    </motion.div>
  );
};
export default ScrollReveal;
