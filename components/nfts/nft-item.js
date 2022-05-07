import { Box, Badge, Center, Image, Stack, Text } from '@chakra-ui/react';

import ProductVideo from './product-video';

export default function NFT({
  url,
  collectionName,
  name,
  onSelect,
  nonce,
  explorerAddress,
  identifier
}) {
  const imageHeight = 400;
  const isVideo = url?.endsWith('.mp4');

  return (
    <Center py={12}>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={'gray.800'}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}
        onClick={onSelect}
      >
        <Box
          cursor='pointer'
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={`${imageHeight}px`}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${url})`,
            filter: 'blur(15px)',
            zIndex: -1
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)'
            }
          }}
        >
          {isVideo ? (
            <ProductVideo
              name={name}
              containerStyles={{
                borderRadius: '0.5rem',
                background: 'black'
              }}
              style={{
                borderRadius: '0.5rem',
                marginTop: -12,
                height: `${imageHeight}px`,
                objectFit: 'cover'
              }}
              uri={url}
            />
          ) : (
            <Image
              rounded={'lg'}
              height={imageHeight}
              width={282}
              objectFit={'cover'}
              src={url}
            />
          )}
        </Box>
        <Stack pt={3}>
          <Box>
            <Text
              fontSize='md'
              variant='bold.normal'
              overflow='hidden'
              textOverflow='ellipsis'
              whiteSpace='nowrap'
              title={name}
            >
              {name}
            </Text>
          </Box>
          <Box display='flex' flexDir='column' flex={1}>
            <Text
              display='flex'
              fontSize='sm'
              marginRight={[0, 8]}
              marginBottom={[1, 0]}
              color='#c423c6'
            >
              {/* <Text
                ml={1}
                fontSize='sm'
                overflow='hidden'
                textOverflow='ellipsis'
                whiteSpace='nowrap'
                title={name}
              >
                {' '}
                {collectionName}
              </Text> */}
              <Badge
                fontSize='0.8em'
                colorScheme='green'
                textOverflow='ellipsis'
              >
                {collectionName}
              </Badge>
            </Text>
            {/* <Text display='flex' fontSize='sm' color='#c423c6'>
              Rarity:{' '}
              <Text ml={1} fontSize='sm'>
              </Text>
            </Text> */}
          </Box>
        </Stack>
      </Box>
    </Center>
  );
}
