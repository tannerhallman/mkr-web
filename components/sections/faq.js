import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel
} from '@chakra-ui/accordion';
import { Box, Container, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';

import faqs from '../../constants/faqs';

import SectionHeader from './section-header';

export default function faq() {
  return (
    <>
      <SectionHeader color='#c423c6' start title='FAQ' />
      <Container maxW='container.lg'>
        <Box>
          <Accordion allowToggle>
            {faqs.map((item, i) => (
              <AccordionItem
                key={`accordian-item-${i}`}
                // as={Button}
                // backgroundColor={'#FFF'}
                marginBottom={5}
                paddingY={1}
              >
                <AccordionButton>
                  <Box flex='1' textAlign='left'>
                    <Text fontSize='24px'>{item.question}</Text>
                  </Box>
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <Text>{item.answer}</Text>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Box>
      </Container>
    </>
  );
}
