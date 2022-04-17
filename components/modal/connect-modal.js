import { Button } from '@chakra-ui/button';
import { ChevronLeftIcon, ChevronRightIcon, InfoIcon } from '@chakra-ui/icons';
import { Box, Flex, Link, Text, VStack } from '@chakra-ui/layout';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/modal';
import { Tooltip } from '@chakra-ui/tooltip';

import { useCallback, useEffect, useState } from 'react';

import ElrondLogin from '../logins/elrond-login';
import ExtensionLogin from '../logins/extension-login';
import MaiarLogin from '../logins/maiar-login';
import ElrondLogo from '../logos/elrond-logo';
import MaiarLogo from '../logos/maiar-logo';

const Wallet = {
  None: -1,
  Maiar: 0,
  Ledger: 1,
  Elrond: 2,
  Extension: 3
};

function ModalButton({ icon, text, wallet, onClick }) {
  return (
    <Button
      width='100%'
      paddingBottom={30}
      paddingTop={30}
      onClick={() => onClick(wallet)}
      _active={{ background: 'whiteAlpha.300' }}
      _hover={{ background: 'whiteAlpha.300' }}
      background='blackAlpha.600'
    >
      <Flex flex={1}>
        <Box boxSizing={25} marginRight={2}>
          {icon}
        </Box>
        <Box marginRight='auto'>
          <Text color='white'>{text}</Text>
        </Box>
        <Box>
          <ChevronRightIcon />
        </Box>
      </Flex>
    </Button>
  );
}

export default function ConnectModal({ isOpen, onClose }) {
  const [selectedWallet, setSelectedWallet] = useState(Wallet.None);
  const header =
    selectedWallet === Wallet.Maiar
      ? 'Maiar Login'
      : selectedWallet === Wallet.Ledger
      ? 'Ledger Login'
      : 'Connect to a wallet';

  const onCloseModal = useCallback(() => {
    setSelectedWallet(Wallet.None);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (typeof localStorage !== 'undefined' && selectedWallet !== Wallet.None) {
      localStorage.removeItem('walletconnect');
    }
  }, [selectedWallet]);

  return (
    <Modal isOpen={isOpen} onClose={onCloseModal} isCentered size='lg'>
      <ModalOverlay />
      <ModalContent paddingX={15} background='gray.900'>
        <ModalHeader paddingTop={30}>
          <Flex alignItems='center' background='gray.900'>
            <Box flexGrow={1} marginRight='auto'>
              <Text color='white'>
                {header}
                {selectedWallet === Wallet.None && (
                  <Tooltip
                    hasArrow
                    label='Connect securely using one of the following options.'
                    bg='black'
                    color='white'
                    placement='top'
                    fontWeight='700'
                    padding={15}
                  >
                    <InfoIcon
                      color='white'
                      boxSize={4}
                      marginBottom={1}
                      marginLeft={2}
                    />
                  </Tooltip>
                )}
              </Text>
            </Box>
            <Box>
              <ModalCloseButton
                pos='relative'
                color='white'
                top={0}
                right={0}
              />
            </Box>
          </Flex>
          {selectedWallet !== Wallet.None && (
            <Flex alignItems='center'>
              <Link
                variant='default'
                onClick={() => setSelectedWallet(Wallet.None)}
              >
                <ChevronLeftIcon />
                Back to wallets
              </Link>
            </Flex>
          )}
        </ModalHeader>
        <ModalBody>
          {selectedWallet === Wallet.None && (
            <VStack spacing={15}>
              <ModalButton
                icon={<MaiarLogo />}
                text='Maiar App'
                wallet={Wallet.Maiar}
                onClick={setSelectedWallet}
              />
              {/* <ModalButton
                icon={<MaiarLogo />}
                text='Maiar DeFi Wallet'
                wallet={Wallet.Extension}
                onClick={setSelectedWallet}
              />
              <ModalButton
                icon={<LedgerLogo />}
                text='Ledger'
                wallet={Wallet.Ledger}
                onClick={setSelectedWallet}
              /> */}
              <ModalButton
                icon={<ElrondLogo />}
                text='Elrond Web Wallet'
                wallet={Wallet.Elrond}
                onClick={setSelectedWallet}
              />
            </VStack>
          )}
          {selectedWallet === Wallet.Maiar && (
            <MaiarLogin onClose={onCloseModal} />
          )}
          {selectedWallet === Wallet.Elrond && <ElrondLogin />}
          {selectedWallet === Wallet.Extension && (
            <ExtensionLogin onClose={onCloseModal} />
          )}
        </ModalBody>
        {selectedWallet === Wallet.None && (
          <ModalFooter paddingBottom={30}>
            <Flex
              flex={1}
              direction='column'
              alignItems='center'
              justifyContent='center'
            >
              <Box marginBottom={2}>
                <Text>New to Elrond?</Text>
              </Box>
              <Box>
                <Link href='https://wallet.elrond.com/create' target='_blank'>
                  Create a Wallet
                </Link>
              </Box>
            </Flex>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
}
