import React, { useEffect, useRef, useState } from 'react'
import './FadeIn.css'

// Wraps its children and fades/slides them in the first time they scroll
// into view, instead of always rendering them fully visible up-front.
const FadeIn = ({ children, className = '', as: Component = 'div', ...rest }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Component ref={ref} className={`fade-in ${visible ? 'fade-in-visible' : ''} ${className}`} {...rest}>
      {children}
    </Component>
  );
};

export default FadeIn
