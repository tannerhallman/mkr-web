import { Container, Image, Stack } from '@chakra-ui/react';

import config from '../constants/config';

import FadeInWhenVisible from './animation/fade-in-while-visible';
export default function Logo() {
  return (
    <FadeInWhenVisible>
      <Container maxW='container.sm' marginY={0}>
        <Stack display='flex' flex={1} alignItems='center'>
          <Image
            src='/img/logo.png'
            alt={`${config.projectName} Logo`}
            maxW='40%'
            style={{ position: 'relative', zIndex: 1 }}
          />
        </Stack>
      </Container>
    </FadeInWhenVisible>
  );
}
