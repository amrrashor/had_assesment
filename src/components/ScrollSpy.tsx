import { useEffect, useState } from 'react';

interface ScrollSpyProps {
  sections: {
    id: string;
    label: string;
  }[];
  offset?: number;
}

export const ScrollSpy = ({ sections, offset = 100 }: ScrollSpyProps) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      const currentSection = sections.find(section => {
        const element = document.getElementById(section.id);
        if (!element) return false;

        const top = element.offsetTop;
        const height = element.offsetHeight;
        return scrollPosition >= top && scrollPosition < top + height;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections, offset]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const top = element.offsetTop - offset + 1;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <nav className="scroll-spy-nav">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <ul className="flex gap-8">
          {sections.map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => scrollToSection(id)}
                className={`scroll-spy-link ${activeSection === id ? 'active' : ''}`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}; 