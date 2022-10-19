import React, {useState, useContext, useEffect} from 'react'
import styled from 'styled-components'

import {MarketplaceContext} from '../context/MarketplaceContext'
import StoreCard from '../components/StoreCard'

import NFLogo from '../assets/NFLogo.jpg'

const Title = styled.h1`
    margin: 30px;
    font-size: 1.5rem;
`
const Stores = styled.div`
    padding: 20px;
    display: grid;
    grid-template-columns: 250px 250px 250px 250px;
    grid-templaate-rows: auto auto auto auto;
    grid-row-gap: 50px;
    grid-column-gap: 75px;
`
const ConnectWalletContainer = styled.div`
    margin-top: 10px; 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const ConnectWalletButton = styled.button`
    color: white;
    background: black;
    border-radius: 8px;
    padding: 12px;
    &:hover{
        cursor: pointer;
    }
`

function Home() {
    const { connectWallet, connected, currentAccount, loadNFTs, nfts,loadingState } = useContext(MarketplaceContext);

    useEffect(() => {
        loadNFTs()
    },[])

    const unfilteredCreators = [];
    nfts.map(nft => {
        unfilteredCreators.push(nft.creator)
    })
    const creators = unfilteredCreators.filter((c,index) => {
        return unfilteredCreators.indexOf(c) === index;
    })
    
    return (
        <div>
            <ConnectWalletContainer>
                {!connected ? 
                        <ConnectWalletButton type="button" onClick={connectWallet}>
                            Connect Your Wallet
                        </ConnectWalletButton>
                : 
                <div>
                    Welcome: {currentAccount}
                </div>
                }
            </ConnectWalletContainer>

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

export default Home