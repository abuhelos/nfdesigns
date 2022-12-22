import React, {useEffect, useState, createContext} from 'react'

import {ethers} from 'ethers'
import { contractABI, contractAddress } from '../utils/constants'
import Web3Modal from 'web3modal'
import axios from 'axios'

interface NFT {
    creator: string,
    image: string,
    name: string,
    owner: string
    price: string,
    resell: boolean,
    seller: string,
    tokenId: number | string,
}

export interface MarketplaceContextProps {
    connected: boolean, 
    currentAccount: string,
    loadingState: string,
    myCreations: NFT[],
    myNFTs: NFT[], 
    nfts: NFT[],
    buyItem: (nft: NFT) => Promise<void>, 
    loadCreations: () => Promise<void>,
    loadNFTs: () => Promise<void>, 
    loadMyNFTs: () => Promise<void>,
    setMyCreations: React.Dispatch<React.SetStateAction<NFT[]>>,
    setMyNFTs: React.Dispatch<React.SetStateAction<NFT[]>>,
    setNfts: React.Dispatch<React.SetStateAction<NFT[]>>,
}

const MarketplaceContext = createContext<MarketplaceContextProps>({
    connected: true,
    currentAccount: "",
    loadingState: "",
    myCreations: [],
    myNFTs: [], 
    nfts: [],
    buyItem: ()=> {return Promise.resolve()}, 
    loadCreations: ()=> {return Promise.resolve()},
    loadNFTs: ()=> {return Promise.resolve()}, 
    loadMyNFTs: ()=> {return Promise.resolve()},
    setMyCreations:() => {},
    setMyNFTs: () => {},
    setNfts: () => {},
});

const {ethereum} = window;

function MarketplaceProvider({children}) {
    const [currentAccount, setCurrentAccount] = useState<string>("")
    const [connected, setConnected] = useState<boolean>(false)
    const [nfts, setNfts] = useState<Array<NFT>>([])
    const [myNFTs, setMyNFTs] = useState<Array<NFT>>([])
    const [myCreations, setMyCreations] = useState<Array<NFT>>([])
    const [loadingState, setLoadingState] = useState<string>('not-loaded')

    useEffect(() => {
        checkIfWalletIsConnected();
    }, [])

    async function checkIfWalletIsConnected() {
        try {
            if (!ethereum) return alert("Please install MetaMask.");
      
            const accounts: string = await ethereum.request({ method: "eth_accounts" });
      
            if (accounts.length) {
              setCurrentAccount(accounts[0]);
              setConnected(true)
            } else {
              console.log("No accounts found");
            }
          } catch (error) {
            console.log(error);
          }
    }

    async function getContract() {
        const web3Modal = new Web3Modal() 
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, contractABI, signer)
        return contract;
    }

    async function buyItem(nft: NFT) {
        const contract = await getContract();
        const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
        const transaction = await contract.createMarketSale(nft.tokenId, {
            value: price
        })
        await transaction.wait()
        loadNFTs()
    }

    async function loadNFTs() {
        const contract = await getContract();
        const data: NFT[] = await contract.fetchMarketItems()
    
        const items = await Promise.all(data.map(async i=> {
            const tokenUri: string = await contract.tokenURI(i.tokenId)
            const meta = await axios.get(tokenUri)
            let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
            let item = {
                name: meta.data.name,
                price,
                tokenId: Number(i.tokenId),
                seller: i.seller,
                owner: i.owner,
                creator: i.creator,
                resell: i.resell,
                image: meta.data.image,
            }
            return item
        }))
        setNfts(items)
        setLoadingState('loaded')
    }

    async function loadMyNFTs() {
        const contract = await getContract()
        const data: NFT[] = await contract.fetchMyNFTs()
    
        const items = await Promise.all(data.map(async i=> {
            const tokenUri = await contract.tokenURI(i.tokenId)
            const meta = await axios.get(tokenUri)
            let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
            let item = {
                name: meta.data.name,
                price,
                tokenId: Number(i.tokenId),
                seller: i.seller,
                owner: i.owner,
                creator: i.creator,
                resell: i.resell,
                image: meta.data.image,
            }
            return item
        }))
        setMyNFTs(items)
    }

    async function loadCreations() {
        const contract = await getContract()
        const data: NFT[] = await contract.fetchItemsListed()
    
        const items = await Promise.all(data.map(async i=> {
            const tokenUri = await contract.tokenURI(i.tokenId)
            const meta = await axios.get(tokenUri)
            let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
            let item = {
                name: meta.data.name,
                price,
                tokenId: Number(i.tokenId),
                seller: i.seller,
                owner: i.owner,
                creator: i.creator,
                resell: i.resell,
                image: meta.data.image,
            }
            return item
        }))
        setMyCreations(items)
    }

    return (
        <MarketplaceContext.Provider value={
            {
                connected, 
                currentAccount,
                loadingState,
                myCreations,
                myNFTs, 
                nfts,
                buyItem, 
                loadCreations,
                loadNFTs, 
                loadMyNFTs,
                setMyCreations,
                setMyNFTs,
                setNfts,
            }}>
            {children}
        </MarketplaceContext.Provider>
    )
}

export {MarketplaceProvider, MarketplaceContext}