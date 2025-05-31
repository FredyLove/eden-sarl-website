'use client';

import { motion } from 'framer-motion';

const variants = {
  fadeInUp: {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6 },
    }),
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.15, duration: 0.6 },
    }),
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 40 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.15, duration: 0.6 },
    }),
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.15, duration: 0.6 },
    }),
  },
};

export default function FadeIn({
  children,
  variant = 'fadeInUp',
  delay = 0,
}: {
  children: React.ReactNode;
  variant?: keyof typeof variants;
  delay?: number;
}) {
  return (
    <motion.div
      variants={variants[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      custom={delay}
    >
      {children}
    </motion.div>
  );
}
