import { useState, useEffect } from 'react';
import { format } from 'date-fns';

export function Navigation() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-white'
      }`}
    >
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="/" className="text-sm font-semibold text-black hover:opacity-70 transition-opacity">
          cornfield.ai
        </a>

        {/* Navigation Links */}
        <div className="flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
          <a
            href="#work"
            className="text-sm text-gray-600 hover:text-black transition-colors"
          >
            Work
          </a>
          <a
            href="#archive"
            className="text-sm text-gray-600 hover:text-black transition-colors"
          >
            Archive
          </a>
          <a
            href="#info"
            className="text-sm text-gray-600 hover:text-black transition-colors"
          >
            Info
          </a>
        </div>

        {/* Time */}
        <div className="text-sm text-gray-500 tabular-nums">
          {format(currentTime, 'h:mm:ss a')}
        </div>
      </div>
    </nav>
  );
}
