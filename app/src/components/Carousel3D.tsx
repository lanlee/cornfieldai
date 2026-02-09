import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CarouselCard } from './CarouselCard';
import type { Project } from '@/types';

gsap.registerPlugin(ScrollTrigger);

interface Carousel3DProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export function Carousel3D({ projects, onSelectProject }: Carousel3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const cardCount = projects.length;
  const anglePerCard = 360 / cardCount;
  const radius = 500; // Distance from center

  // Calculate card position based on index and current rotation
  const getCardStyle = useCallback((index: number): React.CSSProperties => {
    const cardAngle = (index * anglePerCard + rotation) * (Math.PI / 180);
    const rotateY = index * anglePerCard + rotation;
    
    // Calculate position in 3D space
    const translateX = Math.sin(cardAngle) * radius;
    const translateZ = Math.cos(cardAngle) * radius - radius;
    
    // Calculate visual properties based on depth
    const normalizedZ = (translateZ + radius) / (radius * 2); // 0 to 1
    const scale = 0.7 + normalizedZ * 0.3; // Scale from 0.7 to 1.0
    const opacity = 0.4 + normalizedZ * 0.6; // Opacity from 0.4 to 1.0
    
    // Z-index based on depth (higher Z = closer to viewer = higher z-index)
    const zIndex = Math.round(normalizedZ * 100);

    return {
      transform: `
        translateX(${translateX}px)
        translateZ(${translateZ}px)
        rotateY(${rotateY}deg)
        scale(${scale})
      `,
      opacity,
      zIndex,
    };
  }, [rotation, anglePerCard, radius]);

  useEffect(() => {
    if (!containerRef.current || !carouselRef.current) return;

    const ctx = gsap.context(() => {
      // Create scroll-triggered animation
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=3000',
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          // Map scroll progress to rotation
          // Full scroll = 2 full rotations (720 degrees)
          const newRotation = self.progress * 720;
          setRotation(newRotation);
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      {/* 3D Carousel Container */}
      <div
        ref={carouselRef}
        className="relative"
        style={{
          transformStyle: 'preserve-3d',
          width: '400px',
          height: '250px',
        }}
      >
        {projects.map((project, index) => (
          <CarouselCard
            key={project.id}
            project={project}
            style={getCardStyle(index)}
            onClick={() => onSelectProject(project)}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-gray-400 uppercase tracking-wider">
          Scroll to explore
        </span>
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-gray-400 rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
}
