import config from './config';

export const SOCIAL_NAV_ITEMS = [
  {
    label: 'Twitter',
    href: config.twitterUrl,
    icon: '/logos/twitter-logo.png',
    target: '_blank'
  },
  {
    label: 'Discord',
    href: config.discordUrl,
    icon: '/logos/discord-logo.png',
    target: '_blank'
  }
];

export const MAIN_NAV = [
  {
    label: 'Home',
    href: '/'
  },
  {
    label: 'About',
    href: '/#about'
  },
  {
    label: 'FAQ',
    href: '/#faq'
  },
  {
    label: 'My NFTs',
    href: '/wallet',
    requiresAddress: true
  },
  {
    label: 'Mint',
    href: '/mint',
    badge: true
  }
];
