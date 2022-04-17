import { useBreakpointValue } from '@chakra-ui/media-query';
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden
} from '@chakra-ui/react';

import { useCallback } from 'react';

import { FaDiscord, FaTwitter } from 'react-icons/fa';

import { ReactNode } from 'react';

import config from '../constants/config';
import { SOCIAL_NAV_ITEMS } from '../constants/nav';

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200')
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function SmallWithSocial() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Text>
          Copyright &copy; {new Date().getFullYear()} {config.companyName}
        </Text>
        <Stack direction={'row'} spacing={6}>
          <SocialButton
            label={'Twitter'}
            href={config.twitterUrl}
            target='_blank'
          >
            <FaTwitter />
          </SocialButton>
          <SocialButton
            label={'Discord'}
            href={config.discordUrl}
            target='_blank'
          >
            <FaDiscord />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}
