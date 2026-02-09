export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  client: string;
  agency: string;
  disciplines: string[];
  year: string;
  color: string;
}

export interface CarouselPosition {
  rotateY: number;
  translateX: number;
  translateZ: number;
  scale: number;
  opacity: number;
  zIndex: number;
}
