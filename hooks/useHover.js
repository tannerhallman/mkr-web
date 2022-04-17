import { useCallback, useEffect, useState } from 'react';

function useHover() {
  const [hovering, setHovering] = useState(false);
  const onHoverProps = {
    onMouseEnter: () => setHovering(true),
    onMouseLeave: () => setHovering(false)
  };
  return [hovering, onHoverProps];
}
export default useHover;
