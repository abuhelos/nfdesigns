import React, {useState, useEffect, useContext} from 'react'
import {Routes, Route, useParams} from 'react-router-dom'
import styled from 'styled-components'
import {MarketplaceContext} from '../context/MarketplaceContext'

import {ethers} from 'ethers'
import { contractABI, contractAddress } from '../utils/constants'
import Web3Modal from 'web3modal'
import axios from 'axios'

export default function DetailedMyNFT() {
    const [formData, setFormData] = useState({price: ""})
    const { loadNFTs, myNFTs} = useContext(MarketplaceContext);
    const {tokenId} = useParams()
    const filteredNFT = myNFTs.find(nft => (nft.tokenId == tokenId))

    async function reSell(nft) {
        const web3Modal = new Web3Modal() 
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        let contract = new ethers.Contract(contractAddress, contractABI, signer)

        let listingPrice = await contract.getListingPrice()
        listingPrice = listingPrice.toString()
        const price = ethers.utils.parseUnits(formData.price, 'ether')
        const transaction = await contract.resellToken(nft.tokenId, price, {value: listingPrice})
        await transaction.wait()
        loadNFTs()
    }

    return (
        <Container>
            <Image image={filteredNFT.image}/>
            <DetailsContainer>
                <h1><strong>Item: {filteredNFT.name}</strong></h1>
                <h2>Price: {filteredNFT.price}</h2>
                <h2>Seller: {filteredNFT.seller}</h2>
                <h2>Creator: {filteredNFT.creator}</h2>
                <h2>Owner: {filteredNFT.owner}</h2>
                

                <Input 
                    type="text"
                    placeholder='Set Price (MATIC)'
                    onChange={e => setFormData(prevFormData => {
                        return {
                            ...prevFormData,
                            price: e.target.value
                        }
                    })}
                    name="price"
                    value={formData.price}
                />
                <ResellItem onClick={()=>{reSell(filteredNFT)}}>Resell Item</ResellItem>
            </DetailsContainer>
        </Container>
    )
}

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
const FormContainer = styled.form`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-top 20px;
`
const Input = styled.input`
    margin: 5px 15px 0px 15px;
    border: 2px solid black;
`
const ResellItem = styled.button`
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