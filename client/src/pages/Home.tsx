import React, {useContext, useEffect} from 'react'
import styled from 'styled-components'

import {MarketplaceContext} from '../context/MarketplaceContext'
import StoreCard from '../components/StoreCard'

const NFLogo = '/assets/NFLogo.jpg'

export default function Home(): JSX.Element {
    const {loadNFTs, nfts, loadingState } = useContext(MarketplaceContext);

    useEffect(() => {
        loadNFTs()
    },[])

    const unfilteredCreators: string[] = [];
    
    nfts.map(nft => {
        unfilteredCreators.push(nft.creator)
    })
    const creators = unfilteredCreators.filter((c,index) => {
        return unfilteredCreators.indexOf(c) === index;
    })
    
    return (
        <div>
            <div>
                <Title>
                    {loadingState === 'loaded' && !nfts.length ? 'No Stores Listed' : 'All Stores'}
                </Title>
                <Stores>
                    {
                        creators.map(creator => (
                            <StoreCard key={creator} creator={creator} image={NFLogo}/>
                        ))
                    }
                </Stores>
            </div>
        </div>
    )
}

const Title = styled.h1`
    margin: 30px;
    font-size: 1.5rem;
    font-weight: bold;
`
const Stores = styled.div`
    padding: 20px;
    display: grid;
    grid-template-columns: 250px 250px 250px 250px;
    grid-templaate-rows: auto auto auto auto;
    grid-row-gap: 50px;
    grid-column-gap: 75px;
`