import {
  Box,
  Text,
  Alert,
  AlertIcon,
  Skeleton,
  IconButton,
  Heading
} from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/spinner';
import { RepeatIcon } from '@chakra-ui/icons';

import React from 'react';

import { useQuery } from 'react-query';

import config from '../../constants/config';

const intervalMs = 20 * 1000;

export default function MintStatus({ quantityMinted, quantityTotal }) {
  return (
    <Box marginBottom='1rem'>
      <Text color='white'>Minted</Text>
      <Skeleton height='20px' isLoaded={true}>
        <Heading as='h3' variant='subHeader'>
          {quantityMinted} / {quantityTotal}
        </Heading>
      </Skeleton>
    </Box>
  );
}
