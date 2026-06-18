import React from 'react';
import { motion } from 'framer-motion';

interface FloatingElementProps {
  children: React.ReactNode;
  duration?: number;
  yRange?: number;
  className?: string;
}

export const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  duration = 6,
  yRange = 12,
  className = '',
}) => {
  return (
    <motion.div
      animate={{
        y: [0, -yRange, 0],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
export default FloatingElement;
