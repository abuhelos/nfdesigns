import React, {useState, useContext, useEffect} from 'react'
import styled from 'styled-components'
import {useParams} from 'react-router-dom'

import {MarketplaceContext} from '../context/MarketplaceContext'
import ListingItem from '../components/ListingItem'

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
`
const Products = styled.div`
    padding: 20px;
    display: grid;
    grid-template-columns: 250px 250px 250px 250px;
    grid-templaate-rows: auto auto auto auto;
    grid-row-gap: 50px;
    grid-column-gap: 20px;
`