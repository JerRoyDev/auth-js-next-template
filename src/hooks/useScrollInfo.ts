import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook för att spåra fönstrets scroll-position, riktning och tröskel.
 *
 * @param {number} threshold - Antal pixlar att scrolla innan isScrolled blir true.
 * @returns {object} { scrollY, scrollX, isScrolledY, isScrolledX, directionY, directionX }
 */
const useScrollPosition = (threshold = 50) => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollX, setScrollX] = useState(0);
  const [directionY, setDirectionY] = useState<'up' | 'down' | null>(null);
  const [directionX, setDirectionX] = useState<'left' | 'right' | null>(null);
  const [isScrolledY, setIsScrolledY] = useState(false);
  const [isScrolledX, setIsScrolledX] = useState(false);

  // Använd useRef för att lagra de tidigare värdena utan att trigga re-render
  const prevScrollY = useRef(0);
  const prevScrollX = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentScrollX = window.scrollX;

      // --- Uppdatera Riktning ---
      if (currentScrollY !== prevScrollY.current) {
        setDirectionY(currentScrollY > prevScrollY.current ? 'down' : 'up');
      } else {
        setDirectionY(null); // Om värdet är detsamma (stannade)
      }

      if (currentScrollX !== prevScrollX.current) {
        setDirectionX(currentScrollX > prevScrollX.current ? 'right' : 'left');
      } else {
        setDirectionX(null); // Om värdet är detsamma (stannade)
      }

      // --- Uppdatera Position och Tröskel ---
      setScrollY(currentScrollY);
      setScrollX(currentScrollX);

      setIsScrolledY(currentScrollY > threshold);
      setIsScrolledX(currentScrollX > threshold);

      // --- Uppdatera Ref-värden (VIKTIGT!) ---
      // Detta MÅSTE ske sist så de är uppdaterade till nästa anrop
      prevScrollY.current = currentScrollY;
      prevScrollX.current = currentScrollX;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initialt anrop för att sätta startvärden (inklusive ref)
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // Vi vill inte att useEffect ska köras om vid scrollY/scrollX (oändlig loop)
    // Endast threshold är ett stabilt beroende.
  }, [threshold]);

  return { scrollY, scrollX, isScrolledY, isScrolledX, directionY, directionX };
};

export default useScrollPosition;