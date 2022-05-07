import { Box } from '@chakra-ui/react';
import { useRef, useState } from 'react';

import useIntersectionObserver from '../../hooks/useIntersectionObserver';

export default function ProductVideo({ containerStyles, name, style, uri }) {
  const [isInView, setIsInView] = useState(false);

  const containerRef = useRef();

  useIntersectionObserver({
    ref: containerRef,
    onViewportEnter: () => {
      setIsInView(true);
    }
  });

  const videoStyle = { ...style, zIndex: 2 };

  return (
    <Box style={containerStyles} ref={containerRef}>
      {isInView && (
        <video
          onLoad={() => console.log('loaded', name)}
          title={name}
          muted={true}
          autoPlay={true}
          playsInline={true}
          loop={true}
          src={uri}
          style={videoStyle}
        />
      )}
    </Box>
  );
}
