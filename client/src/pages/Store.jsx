import React, {useState, useContext, useEffect} from 'react'
import styled from 'styled-components'
import {useParams} from 'react-router-dom'

import {MarketplaceContext} from '../context/MarketplaceContext'
import ListingItem from '../components/ListingItem'
import dummyData from '../utils/dummyData'

export default function Store() {
    const { nfts,loadingState } = useContext(MarketplaceContext);
    const {storeCreator} = useParams()

    const filteredNFT = nfts.filter(nft => nft.creator === storeCreator && nft.resell === false)
    const resaleNFT = nfts.filter(nft => nft.creator === storeCreator && nft.resell === true)

    return (
        <div>
            <div>
                <Title>
                    {loadingState === 'loaded' && !nfts.length ? 'No Items Listed' : 'All Products'}
                </Title>
                <Products>
                    {/* {
                        dummyData.map((nft,i) => (
                            <ListingItem key={i} name = {nft.name} price = {nft.price} image = {nft.image} tokenId={nft.tokenId}/>
                        ))
                    } */}
                    {
                        filteredNFT.map((nft,i) => (
                            <ListingItem key={i} name = {nft.name} price = {nft.price} image = {nft.image} tokenId={nft.tokenId}/>
                        ))
                    }
                </Products>
            </div>
            <div>
                <Title>
                        {loadingState === 'loaded' && !resaleNFT.length ? 'No Items For Resale' : 'Items For Resale'}
                    </Title>
                    <Products>
                        {
                            resaleNFT.map((nft,i) => (
                                <ListingItem key={i} name = {nft.name} price = {nft.price} image = {nft.image} tokenId={nft.tokenId}/>
                            ))
                        }
                    </Products>
            </div>
        </div>
    )
}

const Title = styled.h2`
    margin: 30px;
    font-size: 1.5rem;
    font-weight: bold;
`
const Products = styled.div`
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-row-gap: 40px;
    grid-column-gap: 20px;
    `
    /* grid-template-columns: 250px 250px 250px 250px; */