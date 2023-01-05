import React, {useEffect, useState, createContext} from 'react'
import {Contract, ethers} from 'ethers'
import Web3Modal from 'web3modal'
import axios from 'axios'

import { contractABI, contractAddress } from '../utils/constants'
import { MarketplaceContextProps, NFT, RawNFT } from '../schema'

const {ethereum} = window;

const MarketplaceContext = createContext<MarketplaceContextProps>({
    connected: true,
    currentAccount: "",
    loadingState: "",
    myCreations: [],
    myNFTs: [], 
    nfts: [],
    buyItem: () => {return Promise.resolve()}, 
    getContract: () => {return Promise.resolve()},
    loadCreations: ()=> {return Promise.resolve()},
    loadNFTs: () => {return Promise.resolve()}, 
    loadMyNFTs: () => {return Promise.resolve()},
    reSell: () => {return Promise.resolve()},
    setMyCreations: () => {},
    setMyNFTs: () => {},
    setNfts: () => {},
});

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

    async function checkIfWalletIsConnected(): Promise<void>{
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

    async function getContract(): Promise<ethers.Contract>{
        const web3Modal = new Web3Modal() 
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, contractABI, signer)
        return contract;
    }

    async function buyItem(nft: NFT): Promise<void> {
        const contract = await getContract();
        const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
        const transaction = await contract.createMarketSale(nft.tokenId, {
            value: price
        })
        await transaction.wait()
        loadNFTs()
    }

    async function reSell(nft: NFT | undefined, price: string): Promise<void> {
        const contract = await getContract();

        let listingPrice = await contract.getListingPrice()
        listingPrice = listingPrice.toString()
        const newPrice = ethers.utils.parseUnits(price, 'ether')
        const transaction = await contract.resellToken(nft?.tokenId, newPrice, {value: listingPrice})
        await transaction.wait()
        loadNFTs()
    }

    async function loadNFTs(): Promise<void>{
        const contract = await getContract();
        const data: RawNFT[] = await contract.fetchMarketItems()
    
        const items = await Promise.all(data.map(async i => {
            const tokenUri: string = await contract.tokenURI(i.tokenId)
            const meta = await axios.get(tokenUri)
            let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
            let item: NFT = {
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

    async function loadMyNFTs(): Promise<void> {
        const contract = await getContract()
        const data: RawNFT[] = await contract.fetchMyNFTs()
    
        const items = await Promise.all(data.map(async i => {
            const tokenUri = await contract.tokenURI(i.tokenId)
            const meta = await axios.get(tokenUri)
            let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
            let item: NFT = {
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

    async function loadCreations(): Promise<void> {
        const contract = await getContract()
        const data: RawNFT[] = await contract.fetchItemsListed()
    
        const items = await Promise.all(data.map(async i=> {
            const tokenUri = await contract.tokenURI(i.tokenId)
            const meta = await axios.get(tokenUri)
            let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
            let item: NFT = {
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
                getContract,
                loadCreations,
                loadNFTs, 
                loadMyNFTs,
                reSell,
                setMyCreations,
                setMyNFTs,
                setNfts,
            }}>
            {children}
        </MarketplaceContext.Provider>
    )
}

export {MarketplaceProvider, MarketplaceContext}