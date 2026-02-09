import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Project } from '@/types';

interface CarouselCardProps {
  project: Project;
  style: React.CSSProperties;
  onClick: () => void;
}

export function CarouselCard({ project, style, onClick }: CarouselCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        ...style,
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Card Container */}
      <div className="relative w-[400px] h-[250px] rounded-lg overflow-hidden shadow-2xl">
        {/* Background Image */}
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Project Title */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3
            className="text-xl font-bold text-white"
            style={{ color: project.color }}
          >
            {project.title}
          </h3>
          <p className="text-sm text-white/80">{project.subtitle}</p>
        </div>

        {/* View Button - Appears on Hover */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <motion.button
            className="relative px-6 py-2 bg-[#0066FF] text-white text-sm font-medium rounded"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            View
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
