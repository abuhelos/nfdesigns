import React, {useState, useEffect, useContext} from 'react'
import {Routes, Route, useParams} from 'react-router-dom'
import styled from 'styled-components'

import { ethers } from 'ethers'
import { contractABI, contractAddress } from '../utils/constants'
import Web3Modal from 'web3modal'
import axios from 'axios'

import {MarketplaceContext} from '../context/MarketplaceContext'

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    outline: 1px solid grey;
    margin: 15px;
    padding: 50px; 
    border-radius: 50px;
    height: 500px;
`
const Image = styled.img`
    height: auto; 
    width: 300px;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 25px;
    background-image: url(${props=>props.image})
`
const DetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    outline: 1px solid grey;
`
const BuyItem = styled.button`
    border-radius: 4px;
    background-color: #5ca1e1;
    border: none;
    color: #fff;
    text-align: center;
    font-size: 32px;
    padding: 16px;
    width: 220px;
    transition: all 0.5s;
    cursor: pointer;
    margin: 36px;
    box-shadow: 0 10px 20px -8px rgba(0, 0, 0,.7);
    &:hover{
        cursor: pointer;
    }
`

function DetailedListing() {
    const { connectWallet, connected, currentAccount, loadNFTs, nfts,loadingState, buyItem } = useContext(MarketplaceContext);
    const {tokenId} = useParams()
    console.log(tokenId)
    console.log(nfts)
    const filteredNFT = nfts.find(nft => (nft.tokenId == tokenId))
    console.log(filteredNFT)
    return (
        <Container>
            <Image image={filteredNFT.image}/>
            <DetailsContainer>
                <h1><strong>Item: {filteredNFT.name}</strong></h1>
                <h2>Price: {filteredNFT.price}</h2>
                <h2>Seller: {filteredNFT.seller}</h2>
                <h2>Creator: {filteredNFT.creator}</h2>
                <h2>Owner: {filteredNFT.owner}</h2>
                <BuyItem onClick={() => buyItem(filteredNFT)}>Buy Item</BuyItem>
            </DetailsContainer>
        </Container>
    )
}

export default DetailedListing;

// nft items : name, price, tokenId, seller, owner, image