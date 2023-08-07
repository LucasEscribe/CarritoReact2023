import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Component that scrolls to the top of the page whenever the route changes.
 */

function ScrollToTop() {
  const location = useLocation();

    // Scroll to the top when the route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

export default ScrollToTop;
