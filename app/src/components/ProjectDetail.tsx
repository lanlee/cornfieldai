import { motion } from 'framer-motion';
import type { Project } from '@/types';
import { ArrowLeft } from 'lucide-react';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

export function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  return (
    <motion.div
      className="min-h-screen bg-white pt-20 pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Back Button */}
      <div className="px-6 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Work
        </button>
      </div>

      {/* Project Description */}
      <div className="px-6 py-8 max-w-6xl">
        <motion.p
          className="text-2xl md:text-3xl font-medium text-gray-800 leading-relaxed"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {project.description}
        </motion.p>
      </div>

      {/* Metadata Grid */}
      <motion.div
        className="px-6 py-8 border-t border-gray-100"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl">
          {/* Client */}
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
              Client
            </p>
            <p className="text-lg font-semibold text-black">{project.client}</p>
          </div>

          {/* Agency */}
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
              Agency
            </p>
            <p className="text-lg font-semibold text-black">{project.agency}</p>
          </div>

          {/* Disciplines */}
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
              Discipline
            </p>
            <p className="text-lg font-semibold text-black">
              {project.disciplines.join(', ')}
            </p>
          </div>

          {/* Year */}
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
              Year
            </p>
            <p className="text-lg font-semibold text-black">{project.year}</p>
          </div>
        </div>
      </motion.div>

      {/* Hero Image */}
      <motion.div
        className="px-6 py-8"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="w-full overflow-hidden rounded-lg">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-auto object-cover"
          />
        </div>
      </motion.div>

      {/* Additional Content Placeholder */}
      <motion.div
        className="px-6 py-8"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-400 text-sm">Project Detail 1</span>
          </div>
          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-400 text-sm">Project Detail 2</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
