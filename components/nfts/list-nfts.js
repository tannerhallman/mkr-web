import { SimpleGrid, Spinner, Text, Button } from '@chakra-ui/react';

import {
  useGetAccountInfo,
  useGetNetworkConfig
} from '@elrondnetwork/dapp-core';

import axios from 'axios';

import React, { useEffect, useState } from 'react';

import { useQuery } from 'react-query';

import { useRouter } from 'next/router';

import NFT from './nft-item';

const getMyNFTsQueryKey = 'getMyNFTsQueryKey';

const filterByCollectionMainnet = 'RACE-c06f4e';
const filterByCollectionDevnet = 'KART-574362';

export default function ListNFTs() {
  const { address } = useGetAccountInfo();
  const { network } = useGetNetworkConfig();
  const router = useRouter();

  const [collectionId, setCollectionId] = useState(filterByCollectionMainnet);
  useEffect(() => {
    setCollectionId(
      network && network.name === 'Devnet'
        ? filterByCollectionDevnet
        : filterByCollectionMainnet
    );
  }, [network]);

  const {
    isLoading,
    isError,
    data,
    error,
    refetch
  } = useQuery(getMyNFTsQueryKey, () =>
    getNfts(network.apiAddress, address, collectionId)
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={{ base: 0, md: 5, lg: 10 }}
      >
        {data.data.map((nft, index) => (
          <NFT
            name={nft.name}
            key={`nft-${index}`}
            collectionName={nft.collection}
            nonce={nft.nonce}
            url={nft.url}
            explorerAddress={network.explorerAddress}
            identifier={nft.identifier}
            onSelect={() =>
              window.open(`${network.explorerAddress}/nfts/${nft.identifier}`)
            }
          />
        ))}
      </SimpleGrid>
      {!isLoading && data.data.length === 0 && (
        <>
          <Text>You have no Maiar Kart Racing Nfts yet.</Text>
        </>
      )}
    </>
  );
}

async function getNfts(elrondApiAddress, _walletAddress, collectionId) {
  try {
    const response = await axios.get(
      `${elrondApiAddress}/accounts/${_walletAddress}/nfts?size=100${
        collectionId ? '&collection=' + collectionId : ''
      }`
    );
    return response;
  } catch (error) {
    throw new Error(
      `${error.response.status}: ${JSON.stringify(error.response.data)}`
    );
  }
}
