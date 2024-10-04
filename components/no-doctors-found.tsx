'use client';

import { motion } from 'framer-motion';
import { Search, UserRound } from 'lucide-react';

export function NoDoctorsFound() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center p-8 text-center"
    >
      <div className="relative mb-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="text-primary"
        >
          <Search size={64} />
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -bottom-2 -right-2 bg-background rounded-full p-1"
        >
          <UserRound size={24} className="text-muted-foreground" />
        </motion.div>
      </div>
      <h2 className="text-2xl font-bold mb-2">No doctors found</h2>
      <p className="text-muted-foreground max-w-md">
        We couldn&apos;t find any doctors matching your criteria. Don&apos;t worry, though! Try
        adjusting your search or explore other specialties to find the right doctor for you.
      </p>
    </motion.div>
  );
}
