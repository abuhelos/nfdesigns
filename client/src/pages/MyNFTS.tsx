import React, {useState, useContext, useEffect} from 'react'
import styled from 'styled-components'
import Web3Modal from 'web3modal'
import {ethers} from 'ethers'
import { contractABI, contractAddress } from '../utils/constants'
import axios from 'axios'
import {Link, useParams} from 'react-router-dom'

import {MarketplaceContext} from '../context/MarketplaceContext'
import ListingItem from '../components/ListingItem'
import MyNFTItem from '../components/MyNFTItem'
import dummyData from '../utils/dummyData'

export default function MyNFTS() {
    const { myNFTs, setMyNFTs, currentAccount, loadNFTs, nfts, loadMyNFTs} = useContext(MarketplaceContext);
    const [loadingState, setLoadingState] = useState('not-loaded')

    useEffect(() =>{
        loadMyNFTs();
        setLoadingState('loaded')
    },[])

    const items = myNFTs.map((item,i) => {
        return (
            <MyNFTItem key={item.tokenId} name={item.name} price={item.price} image={item.image} tokenId={item.tokenId} />
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

const Title = styled.h1`
    margin: 30px;
    font-size: 1.5rem;
`
/* const Products = styled.div`
    padding: 20px;
    display: grid;
    grid-template-columns: auto auto auto auto;
    grid-templaate-rows: auto auto auto auto;
    grid-row-gap: 50px;
`  */

const Products = styled.div`
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-row-gap: 40px;
    grid-column-gap: 20px;
    `