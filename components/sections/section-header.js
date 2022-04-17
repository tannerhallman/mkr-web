import { Heading } from '@chakra-ui/react';
import { useBreakpointValue } from '@chakra-ui/media-query';
import { Box } from '@chakra-ui/layout';

export default function SectionHeader(props) {
  const { color, title, start } = props;

  const paddingBottom = useBreakpointValue({ base: 25, md: 50 });
  const isBase = useBreakpointValue({ base: true, lg: false });

  return (
    <Box paddingBottom={paddingBottom}>
      <Heading
        as='h1'
        display='flex'
        variant='h1'
        lineHeight={1.1}
        fontWeight={600}
        fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
        justifyContent={isBase ? 'center' : start ? null : null}
      >
        <Box>{title}</Box>
      </Heading>
    </Box>
  );
}
