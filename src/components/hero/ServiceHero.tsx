import { motion } from 'framer-motion';

export function ServiceHero() {
  return (
    <section className="bg-base-100 py-20 text-center">
      <motion.h1
        className="text-4xl font-bold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Build Your Global Future with Helenus
      </motion.h1>
      <motion.p className="text-lg mb-8 max-w-xl mx-auto">
        Expert visa and job placement services tailored for your success.
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <button type='button' className="btn btn-primary btn-lg mr-4">Book Consultation</button>
        <button type='button' className="btn btn-outline btn-secondary">Contact Us</button>
      </motion.div>
    </section>
  );
}
