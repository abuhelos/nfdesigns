import React, {useEffect, useState} from 'react'

import {ethers} from 'ethers'
import { contractABI, contractAddress } from '../utils/constants'
import Web3Modal from 'web3modal'
import axios from 'axios'

const MarketplaceContext = React.createContext()

const {ethereum} = window;

function createEthereumContract() {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const marketplaceContract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log({
        provider,
        signer,
        marketplaceContract
    })

    return marketplaceContract;
}

function MarketplaceProvider({children}) {
    const [currentAccount, setCurrentAccount] = useState("")
    const [connected, setConnected] = useState(false)
    const [nfts, setNfts] = useState([])
    const [loadingState, setLoadingState] = useState('not-loaded')

    useEffect(() => {
        checkIfWalletIsConnected();
    }, [])

    async function checkIfWalletIsConnected() {
        try {
            if (!ethereum) return alert("Please install MetaMask.");
      
            const accounts = await ethereum.request({ method: "eth_accounts" });
      
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

    async function connectWallet() {
        try {
            if (!ethereum) return alert("Please install MetaMask.");
      
            const accounts = await ethereum.request({ method: "eth_requestAccounts", });
      
            setCurrentAccount(accounts[0]);
            setConnected(true);
            window.location.reload();
          } catch (error) {
            console.log(error);
      
            throw new Error("No ethereum object");
          }
    }

    async function loadNFTs() {
        const web3Modal = new Web3Modal() 
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
    
        const contract = new ethers.Contract(contractAddress,contractABI,signer)
        const data = await contract.fetchMarketItems()
    
        const items = await Promise.all(data.map(async i=> {
            const tokenUri = await contract.tokenURI(i.tokenId)
            const meta = await axios.get(tokenUri)
            let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
            let item = {
                name: meta.data.name,
                price,
                tokenId: i.tokenId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                creator: i.creator,
                image: meta.data.image,
            }
            return item
        }))
        setNfts(items)
        setLoadingState('loaded')
    }

    async function buyItem(nft) {
        console.log(nft)
        console.log('marketsale')
        const web3Modal = new Web3Modal() 
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, contractABI, signer)

        const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
        const transaction = await contract.createMarketSale(nft.tokenId, {
            value: price
        })
        await transaction.wait()
        loadNFTs()
    }

    return (
        <MarketplaceContext.Provider value={{connectWallet, connected, currentAccount,nfts,setNfts,loadingState,loadNFTs, buyItem}}>
            {children}
        </MarketplaceContext.Provider>
    )
}

export {MarketplaceProvider, MarketplaceContext}