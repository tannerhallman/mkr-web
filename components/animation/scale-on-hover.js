import { motion } from 'framer-motion';

const ScaleOnHover = ({ children }) => (
  <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }}>
    {children}
  </motion.div>
);

export default ScaleOnHover;
