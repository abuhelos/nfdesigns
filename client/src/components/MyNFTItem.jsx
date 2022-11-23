import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

export default function MyNFTItem(props) {
    return (
        <Link to={`/mynfts/${props.tokenId}`}>
        <ListingContainer>
            <Image image={props.image}/>
            <ListingInfo>
                <Name>{props.name}</Name>
                <Price>Price: {props.price} MATIC</Price>
            </ListingInfo>
        </ListingContainer>
        </Link>
    )
}

const ListingContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: auto;
    height: 400px;
    background-color: grey;
    border-radius: 25px;
`
const Image = styled.img`
    width: auto;
    height: 65%;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 25px 25px 0px 0px;
    background-image: url(${props=>props.image})
`
const ListingInfo = styled.div`
    height: 40px;
    width: 100%;
`
const Name = styled.h1`
    color: #FFFBF2;
`
const Price = styled.p`
    margin-top: 5px;
    color: #FFFBF2;
`