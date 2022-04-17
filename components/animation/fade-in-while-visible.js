import { motion } from 'framer-motion';

export default function FadeInWhenVisible({
  children,
  duration = 0.3,
  delay = 0.2,
  delayChildren = false,
}) {
  return (
    <motion.div
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true }}
      transition={{ duration }}
      variants={{
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            delay,
            delayChildren: delayChildren ? delayChildren : undefined,
          },
        },
        hidden: { opacity: 0, scale: 0.8 },
      }}
    >
      {children}
    </motion.div>
  );
}
