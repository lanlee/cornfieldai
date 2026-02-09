import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Carousel3D } from '@/components/Carousel3D';
import { ProjectDetail } from '@/components/ProjectDetail';
import { projects } from '@/data/projects';
import type { Project } from '@/types';

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedProject(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="relative">
        <AnimatePresence mode="wait">
          {selectedProject ? (
            <ProjectDetail
              key="detail"
              project={selectedProject}
              onBack={handleBack}
            />
          ) : (
            <div key="carousel">
              <Carousel3D
                projects={projects}
                onSelectProject={handleSelectProject}
              />
            </div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default App;
