import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './PageTransition.css'

// Fades the outgoing page out, then swaps in and fades in the new one -
// a plain route change with no page-transition library.
const PageTransition = ({ renderRoutes }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [stage, setStage] = useState('page-enter');

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setStage('page-exit');
    }
  }, [location, displayLocation]);

  return (
    <div
      className={`page-transition ${stage}`}
      onAnimationEnd={() => {
        if (stage === 'page-exit') {
          setDisplayLocation(location);
          setStage('page-enter');
        }
      }}
    >
      {renderRoutes(displayLocation)}
    </div>
  );
};

export default PageTransition
