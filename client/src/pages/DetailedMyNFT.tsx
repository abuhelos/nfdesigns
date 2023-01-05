import React, {useState, useContext} from 'react'
import {useParams} from 'react-router-dom'
import styled from 'styled-components'

import {MarketplaceContext} from '../context/MarketplaceContext'
import { ImageProps } from '../schema'

export default function DetailedMyNFT() {
    const [formData, setFormData] = useState({price: ""})
    const {reSell, myNFTs} = useContext(MarketplaceContext);
    const {tokenId} = useParams()
    const filteredNFT = myNFTs.find(nft => (nft.tokenId == tokenId))

    return (
        <Container>
            <Image image={filteredNFT?.image}/>
            <DetailsContainer>
                <h1><strong>Item: {filteredNFT?.name}</strong></h1>
                <h2>Price: {filteredNFT?.price}</h2>
                <h2>Seller: {filteredNFT?.seller}</h2>
                <h2>Creator: {filteredNFT?.creator}</h2>
                <h2>Owner: {filteredNFT?.owner}</h2>
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
                <ResellItem onClick={()=>{reSell(filteredNFT, formData.price)}}>Resell Item</ResellItem>
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
const Image = styled.img<ImageProps>`
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