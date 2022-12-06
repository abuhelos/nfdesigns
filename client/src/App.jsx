import React from 'react'
import styled, {createGlobalStyle} from "styled-components"
import {Routes, Route, Link} from "react-router-dom"

import Home from "./pages/Home"
import Store from "./pages/Store"
import Sell from "./pages/Sell"
import MyNFTS from "./pages/MyNFTS"
import CreatorDashboard from "./pages/CreatorDashboard"
import DetailedListing from './pages/DetailedListing'
import DetailedMyNFT from './pages/DetailedMyNFT'
import DetailedCreation from './pages/DetailedCreation'

export default function App() {
  return (
    <div>
      <GlobalStyle/>
      <Header>
        <Link to="/" style={{textDecoration: 'none'}}><Title>NFDesigns</Title></Link>
        <Links>
          <Link to="/sell" style={{marginRight:'10px'}}>Sell</Link>
          <Link to="/mynfts" style={{marginRight:'10px'}}>My NFT's</Link>
          <Link to="/creatordashboard">Creator Dashboard</Link>
        </Links>
      </Header>

      <Routes>
        <Route 
          path="/"
          element={<Home />} 
          />
        <Route 
            exact path="/:storeCreator" 
            element={<Store/>}
          />
        <Route
          exact path="/items/:tokenId"
          element={<DetailedListing/>}
          />
        <Route 
          exact path="/sell" 
          element={<Sell/>}
          />
        <Route 
          exact path="/mynfts" 
          element={<MyNFTS/>}
          />
        <Route 
          exact path = "mynfts/:tokenId"
          element={<DetailedMyNFT/>}
          />
        <Route 
          exact path="/creatordashboard" 
          element={<CreatorDashboard/>}
          />
        <Route 
          exact path = "/creatordashboard/:tokenId"
          element={<DetailedCreation/>}
          />
      </Routes>
    </div>
  )
}

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Anek Devanagari', sans-serif;
    font-family: 'Poppins', sans-serif;
  }
`

const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #010A10;
  padding: 20px;
`
const Title = styled.div`
  background-color: #FFFBF2;
  padding: 10px;
  border-radius: 4px;
`
const Links = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 10px;
  padding-right: 10px;
  justify-content: top;
  color: #FFFBF2;
`