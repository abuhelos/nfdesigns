import React from 'react'
import styled, {keyframes} from 'styled-components'
import {Link} from 'react-router-dom'
import useHover from '../hooks/useHover'

export default function ListingItem(props) {
    const [hovered, ref] = useHover();
    console.log(props)
    console.log(hovered)
    return (
        <Link to={`/items/${props.tokenId}`}>
            <ListingContainer ref={ref}>
                <div style={{width: '100%', height: '70%',overflow: 'hidden'}}>
                <Image hovered={hovered} image={props.image}/>
                </div>
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
    background-color: #4C4E52;
    border-radius: 25px;
    overflow: hidden;
    box-shadow: 0px 7px 7px 0px;
`
const ListingInfo = styled.div`
    padding: 10px;
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

const Image = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 25px 25px 0px 0px;
    
    background-image: url(${props=>props.image});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
    
    transform: ${props=>props.hovered ? `scale(1.1)` : `scale(1)`};
    transition: .5s;
    `