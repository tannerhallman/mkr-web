import { Box, Container, Flex, HStack } from '@chakra-ui/layout';
import { useBreakpointValue } from '@chakra-ui/media-query';
import { Button } from '@chakra-ui/button';

import { motion } from 'framer-motion';

import { useCallback, useState } from 'react';

import { useRouter } from 'next/router';

import FadeInWhenVisible from '../animation/fade-in-while-visible';
import ScaleOnHover from '../animation/scale-on-hover';
import config from '../../constants/config';

export default function CallToActionButtons({
  leftText,
  leftRoute,
  disabled = false
}) {
  const router = useRouter();

  const flexDirection = useBreakpointValue({ base: 'column', md: 'row' });
  const justifyContent = useBreakpointValue({
    base: 'center',
    md: 'space-around'
  });
  const [showShares, setShowShares] = useState(false);

  const onClick = useCallback(() => {
    if (leftRoute) {
      router.push(leftRoute);
    } else {
      window.open(config.discordUrl, '_blank');
    }
  }, []);

  const onTellTheWorld = useCallback(() => {
    setShowShares(value => !value);
  }, []);

  return (
    <Container maxW='container.md'>
      <Box>
        <Flex
          flexDir={flexDirection}
          alignItems='center'
          justifyContent={justifyContent}
        >
          <Box>
            <ScaleOnHover>
              <FadeInWhenVisible delay={0.2}>
                <Button onClick={onClick} disabled={disabled}>
                  {leftText}
                </Button>
              </FadeInWhenVisible>
            </ScaleOnHover>
          </Box>
        </Flex>
      </Box>
    </Container>
  );
}
