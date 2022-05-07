import { Box, Skeleton, Heading } from '@chakra-ui/react';

import React from 'react';

export default function MintStatus({ quantityMinted, quantityTotal, loading }) {
  return (
    <Box marginBottom='1rem'>
      <Heading as='h2' size='lg' color='grey.400'>
        Total Minted
      </Heading>
      <Skeleton height='20px' isLoaded={!loading}>
        <Heading as='h2' size='2xl'>
          {quantityMinted} / {quantityTotal}
        </Heading>
      </Skeleton>
    </Box>
  );
}
