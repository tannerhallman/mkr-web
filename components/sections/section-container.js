import { Container } from '@chakra-ui/layout';
import { useBreakpointValue } from '@chakra-ui/media-query';

// import ErrorBoundary from '../error-boundry';

export default function SectionContainer({
  id,
  background,
  backgroundColor,
  backgroundPosition,
  children,
  containerRef
}) {
  const backgroundSize = useBreakpointValue({
    base: 'initial',
    '2xl': 'cover'
  });
  const maxWidth = useBreakpointValue({
    base: 'container.lg',
    lg: 'container.xl'
  });

  return (
    <Container
      id={id}
      maxW='full'
      marginTop='0 !important'
      ref={containerRef}
      background={background}
      backgroundColor={backgroundColor}
      backgroundPosition={backgroundPosition}
      backgroundRepeat='no-repeat'
      backgroundSize={backgroundSize}
      paddingY='3rem'
    >
      <Container maxW={maxWidth}>{children}</Container>
    </Container>
  );
}
