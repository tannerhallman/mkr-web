import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  useColorMode,
  Stack,
  Tag,
  TagLabel
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  AddIcon,
  LinkIcon,
  MoonIcon,
  SunIcon
} from '@chakra-ui/icons';

import {
  logout,
  useGetAccountInfo,
  useGetLoginInfo
} from '@elrondnetwork/dapp-core';

import { motion } from 'framer-motion';

import { useCallback } from 'react';

import config from '../constants/config';
import useHover from '../hooks/useHover';

import ConnectModal from './modal/connect-modal';
const Links = ['mint', 'faq'];

const supportLightMode = false;

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenConnect,
    onOpen: onOpenConnect,
    onClose: onCloseConnect
  } = useDisclosure();

  const { address } = useGetAccountInfo();
  const { isLoggedIn } = useGetLoginInfo();

  const { colorMode, toggleColorMode } = useColorMode();

  const textColor = useColorModeValue('gray.800', 'gray.200');
  const navLinkBackgroundColor = useColorModeValue('gray.200', 'gray.700');

  const onLogout = useCallback(e => {
    e.preventDefault();
    logout();
  }, []);

  const ThemeToggle = () => (
    <IconButton
      marginRight={4}
      size={'md'}
      display={{ base: 'none', md: 'flex' }}
      icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      aria-label={'Toggle Dark Mode'}
      textColor={textColor}
      onClick={toggleColorMode}
    />
  );

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={'center'}>
          <Box>{config.projectName}</Box>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            {Links.map(link => (
              <NavLink key={link} href={link}>
                {link}
              </NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={'center'}>
          {supportLightMode && <ThemeToggle />}
          <WalletButton
            isLoggedIn={isLoggedIn}
            isOpenConnect={isOpenConnect}
            onOpenConnect={onOpenConnect}
            onCloseConnect={onCloseConnect}
          />

          {isLoggedIn && (
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
                _hover={{
                  textDecoration: 'none',
                  bg: navLinkBackgroundColor
                }}
              >
                <Tag
                  size='lg'
                  colorScheme='green'
                  borderRadius='full'
                  aria-label={'Connected to Wallet'}
                  onClick={isOpen ? onClose : onOpen}
                >
                  <LinkIcon mr={2} />
                  <TagLabel>
                    Connected to {address.slice(address.length - 5)}
                  </TagLabel>
                </Tag>
              </MenuButton>
              <MenuList>
                {/* <MenuDivider /> */}
                <MenuItem onClick={onLogout}>Disconnect wallet</MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {Links.map(link => (
              <NavLink
                key={link}
                href={link}
                backgroundColor={navLinkBackgroundColor}
                textColor={textColor}
              >
                {link}
              </NavLink>
            ))}
            {supportLightMode && <ThemeToggle />}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}

const NavLink = ({ children, href, backgroundColor, textColor }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: backgroundColor
    }}
    textColor={textColor}
    href={`/#${href}`}
  >
    {children}
  </Link>
);

const WalletButton = ({
  isLoggedIn,
  onOpenConnect,
  onCloseConnect,
  isOpenConnect
}) => {
  return (
    <motion.div>
      {!isLoggedIn && (
        <Button
          onClick={onOpenConnect}
          variant={'solid'}
          colorScheme={'green'}
          size={'md'}
          mr={4}
          leftIcon={<AddIcon />}
        >
          Wallet
        </Button>
      )}
      <ConnectModal isOpen={isOpenConnect} onClose={onCloseConnect} />
    </motion.div>
  );
};
