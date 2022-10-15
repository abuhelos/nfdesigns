import React, {useState, useContext, useEffect} from 'react'
import styled from 'styled-components'
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
    grid-template-columns: 250px 250px 250px 250px;
    grid-templaate-rows: auto auto auto auto;
    grid-row-gap: 50px;
    grid-column-gap: 20px;
`

function Store() {
    const { connectWallet, connected, currentAccount, loadNFTs, nfts,loadingState } = useContext(MarketplaceContext);

    const {storeCreator} = useParams()
    //let filteredNFT = nfts.find(nft => (nft.creator == storeCreator))
    const filteredNFT = nfts.filter(nft => nft.creator === storeCreator)

    return (
        <div>
            <div>
                <Title>
                    {loadingState === 'loaded' && !nfts.length ? 'No Items Listed' : 'All Products'}
                </Title>
                <Products>
                    {
                        filteredNFT.map((nft,i) => (
                            <Item key={i} name = {nft.name} price = {nft.price} image = {nft.image} tokenId={nft.tokenId}/>
                        ))
                    }
                </Products>
            </div>
        </div>
    )
}

export default Store;