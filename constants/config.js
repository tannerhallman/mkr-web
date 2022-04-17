export default {
  companyName: 'Maiar Kart Racing',
  projectName: 'Maiar Kart Racing',
  projectDescription: 'A p2e nft project on the Elrond Blockchain.',
  projectWebsiteUrl: 'https://www.google.com',
  projectOpenGraphUrl: 'http://www.google.com',
  // format date to string
  releaseDate: new Date('2022-05-08T16:00:00.000Z'),
  whitelistDate: new Date('2022-05-07T16:00:00.000Z'),
  discordUrl: 'https://discord.gg/NYGXTYMUzP',
  twitterUrl: 'https://twitter.com/maiarokart',
  nftPriceInEgld: process.env.NEXT_PUBLIC_NFT_PRICE_IN_EGLD || 1,
  nftQuanityAvailable: process.env.NEXT_PUBLIC_NFT_QUANTITY_AVAILABLE || 2000,
  sentryDSN: '',
  googleTagId: ''
};
