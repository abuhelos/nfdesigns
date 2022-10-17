import React, {useState, useContext, useEffect} from 'react'
import styled from 'styled-components'
import Web3Modal from 'web3modal'
import {ethers} from 'ethers'
import { contractABI, contractAddress } from '../utils/constants'
import axios from 'axios'
import {Link, useParams} from 'react-router-dom'

import {MarketplaceContext} from '../context/MarketplaceContext'
import Item from '../components/Item'
import dummyData from '../utils/dummyData'

const Title = styled.h1`
    margin: 30px;
    font-size: 1.5rem;
`
const Products = styled.div`
    padding: 20px;
    display: grid;
    grid-template-columns: auto auto auto auto;
    grid-templaate-rows: auto auto auto auto;
    grid-row-gap: 50px;
`

function MyNFTS() {
    const { connectWallet, connected, currentAccount, loadNFTs, nfts} = useContext(MarketplaceContext);
    const [myNFTs, setMyNFTs] = useState([])
    const [loadingState, setLoadingState] = useState('not-loaded')

    useEffect(() =>{
        loadMyNFTs();
    },[])

    async function loadMyNFTs() {
        const web3Modal = new Web3Modal() 
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
    
        const contract = new ethers.Contract(contractAddress,contractABI,signer)
        const data = await contract.fetchMyNFTs()
    
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
        console.log(items)
        setMyNFTs(items)
        setLoadingState('loaded')
    }


    const items = myNFTs.map((item,i) => {
        return (
            <Item key={item.tokenId} name={item.name} price={item.price} image={item.image} tokenId={item.tokenId} />
        )
    })
    
    return (
        <div>
            <Title>{loadingState === 'loaded' && !myNFTs.length ? 'No Items' : 'My NFTs'}</Title>
            <Products>
                {items}
            </Products>
        </div>
    )
}

export default MyNFTS