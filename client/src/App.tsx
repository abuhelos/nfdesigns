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
          path="/:storeCreator" 
          element={<Store/>}
          />
        <Route
          path="/items/:tokenId"
          element={<DetailedListing/>}
          />
        <Route 
          path="/sell" 
          element={<Sell/>}
          />
        <Route 
          path="/mynfts" 
          element={<MyNFTS/>}
          />
        <Route 
          path = "mynfts/:tokenId"
          element={<DetailedMyNFT/>}
          />
        <Route 
          path="/creatordashboard" 
          element={<CreatorDashboard/>}
          />
        <Route 
          path = "/creatordashboard/:tokenId"
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