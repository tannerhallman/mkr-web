import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
  ListIcon
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

import config from '../../constants/config';
import SectionHeader from './section-header';
export default function Simple() {
  function renderIcon() {
    return <ListIcon as={CheckIcon} color='green.500' />;
  }
  return (
    <Container maxW={'7xl'}>
      <SectionHeader color='#00b0ee' title='Mint' end />
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18 }}
      >
        <Flex>
          <Image
            rounded={'md'}
            alt={'product image'}
            src={'img/mint-image.gif'}
            fit={'cover'}
            align={'center'}
            w={'100%'}
            h={{ base: '100%', sm: '400px', lg: '500px' }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={'header'}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
            >
              {config.nftQuanityAvailable} unique NFTs
            </Heading>
            <Text
              color={useColorModeValue('gray.900', 'gray.400')}
              fontWeight={300}
              fontSize={'2xl'}
            >
              {config.nftPriceInEgld} egld each
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={'column'}
            divider={
              <StackDivider
                borderColor={useColorModeValue('gray.200', 'gray.600')}
              />
            }
          >
            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('white.500')}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}
              >
                NFT Perks
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <List spacing={2}>
                  <ListItem>
                    {renderIcon()}
                    Bar revenue sharing
                  </ListItem>
                  <ListItem>{renderIcon()} Staking payouts</ListItem>{' '}
                  <ListItem>
                    {renderIcon()} 50% of royalties back to community
                  </ListItem>
                  <ListItem>{renderIcon()} Free merch</ListItem>
                  <ListItem>{renderIcon()} Future NFTs & giveaways</ListItem>
                </List>
                <List spacing={2}>
                  <ListItem>{renderIcon()} Dog charity donations</ListItem>
                  <ListItem>
                    {renderIcon()} Tiered bar tab discounts for holding NFTs
                  </ListItem>
                  <ListItem>
                    {renderIcon()} Free lifetime membership for holders
                  </ListItem>
                  <ListItem>{renderIcon()}Access to Private events</ListItem>
                </List>
              </SimpleGrid>
            </Box>
          </Stack>

          <Button
            rounded={'none'}
            w={'full'}
            mt={8}
            size={'lg'}
            py={'7'}
            disabled
            bg={useColorModeValue('gray.900', 'gray.50')}
            color={useColorModeValue('white', 'gray.900')}
            textTransform={'uppercase'}
            _hover={{
              transform: 'translateY(2px)',
              boxShadow: 'lg'
            }}
          >
            Minting {config.releaseDate.toLocaleDateString()} at{' '}
            {config.releaseDate.toLocaleTimeString()}
          </Button>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
