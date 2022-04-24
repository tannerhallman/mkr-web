import { Link, Text } from '@chakra-ui/react';

import config from '../constants/config';

const FAQS = [
  {
    question: `What is an NFT?`,
    answer: `NFTs (or “non-fungible tokens”) are a special kind of cryptoasset in which each token is unique — as opposed to “fungible” assets like Bitcoin and dollar bills, which are all worth exactly the same amount. Because every NFT is unique, they can be used to authenticate ownership of digital assets like artworks, recordings, and virtual real estate or pets.`
  },
  {
    question: `What is ${config.projectName} NFT Project?`,
    answer: `${config.projectDescription}`
  },
  {
    question: `${config.projectName} NFTs have what type of utility?`,
    answer:
      'They are in-game NFTs that can be used to race and earn MKR points.'
  },
  {
    question: 'How can I purchase one?',
    answer: (
      <Text>
        When the NFTs are available for purchase, connect to your Elrond wallet.
        Once connected, you'll be able to designate how many you'd like and
        purchase your NFTs. Minting will be done through the{' '}
        <Link href='/mint' color='teal.500'>
          mint
        </Link>{' '}
        page.
      </Text>
    )
  },
  {
    question: 'When can I buy?',
    answer: `Launch is currently scheduled for ${config.releaseDate.toLocaleDateString()} at ${config.releaseDate.toLocaleTimeString()} (your local time).`
  },
  {
    question: 'Will there be whitelist?',
    answer: 'Yes. There 500 spots available.'
  },
  {
    question: 'How to get whitelist?',
    answer:
      'To be eligible for the whitelist, join the discord, be active, and invite friends! Rules are in the #🏁┃how-to-whitelist channel'
  },
  {
    question: 'How much will each NFT cost?',
    answer: `The each NFT will be ${config.nftPriceInEgld} egld.`
  }
];

export default FAQS;
