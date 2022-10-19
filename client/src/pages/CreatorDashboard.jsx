import React, {useState, useContext, useEffect} from 'react'
import styled from 'styled-components'

import {MarketplaceContext} from '../context/MarketplaceContext'
import ListingItem from '../components/ListingItem'

const Title = styled.h1`
    margin: 30px;
    font-size: 1.5rem;
`
const Products = styled.div`
    padding: 20px;
    display: grid;
    grid-template-columns: auto auto auto auto;
    grid-templaate-rows: auto auto auto auto;
    grid-row-gap: 50px;
`

function CreatorDashboard() {
    const { myCreations, setMyCreations, loadCreations} = useContext(MarketplaceContext);
    const [loadingState, setLoadingState] = useState('not-loaded')

    useEffect(() =>{
        loadCreations();
    },[])

    const items = myCreations.map((item,i) => {
        console.log(myCreations)
        return (
            <ListingItem key={i} name={item.name} price={item.price} image={item.image} tokenId={item.tokenId}/>
        )
    })

    return (
        <div>
            <Title>{loadingState === 'loaded' && !myCreations.length ? 'No Items' : 'My Listings'}</Title>
            <Products>
                {items}
            </Products>
        </div>
    )
}

export default CreatorDashboard