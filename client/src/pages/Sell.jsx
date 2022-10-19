import React, {useState, useContext} from 'react'
import styled from 'styled-components'
import {redirect} from 'react-router-dom'
import {MarketplaceContext} from '../context/MarketplaceContext'
import {create as ipfsHttpClient} from 'ipfs-http-client'
import {Buffer} from 'buffer'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import { contractABI, contractAddress } from '../utils/constants'

// Styles --------------------------------------------------------------------------------
const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top 20px;
`

const Input = styled.input`
    border: 2px solid black;
`
const SubmitButton = styled.button`
    border: 2px solid black;
    background-color: teal;

    &:hover {
        cursor: pointer;
    }
`
// --------------------------------------------------------------------------------

const projectId = '2FX4d5dPnCGAufDfOsFmZrCZ6iL';
const projectSecret = 'f54da779adf3bdffe3e725b5f498fada';

const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = ipfsHttpClient({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});

// pin.add pins the content which prevents ipfs garbage collection add this later
// You are okay to use just add for now 
/*client.pin.add('QmeGAVddnBSnKc1DLE7DLV9uuTqo5F7QbaveTjr45JUdQn').then((res) => {
    console.log(res);
});
*/

function Sell() {
    const [formData, setFormData] = useState({name: "", price: ""})
    const [fileUrl, setFileUrl] = useState(null)
    const { connectWallet, connected, currentAccount, loadNFTs, nfts,loadingState, buyItem, myNFTs, setMyNFTs} = useContext(MarketplaceContext);

    async function handleChange(e) {
        const file = e.target.files[0];
        try {
            const added = await client.add(
                file,
                {
                    progress: (prog) => console.log(`received: ${prog}`)
                }
            )
            const url = `https://nfdesigns.infura-ipfs.io/ipfs/${added.path}`
            setFileUrl(url)
        } catch (error) {
            console.log(`Error uploading file: `, error)
        }
    }

    async function uploadToIPFS() {
        const {name, price} = formData
        if(!name || !price || !fileUrl) return
        const data = JSON.stringify({
            name, image: fileUrl
        })
        try {
            const added = await client.add(data)
            const url = `https://nfdesigns.infura-ipfs.io/ipfs/${added.path}`
            return url
        } catch (error) {
            console.log(`Error uploading file `, error)
        }
    }

    async function listItemForSale(event) {
        event.preventDefault();
        const url = await uploadToIPFS()
        const web3Modal = new Web3Modal() 
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        const price = ethers.utils.parseUnits(formData.price, 'ether')
        let contract = new ethers.Contract(contractAddress, contractABI, signer)
        let listingPrice = await contract.getListingPrice()
        listingPrice = listingPrice.toString()
        let transaction = await contract.createToken(url, price, {value: listingPrice})
        await transaction.wait()
        loadNFTs();
    }

    return (
        <FormContainer onSubmit={listItemForSale}>
            <Input 
                type="text"
                placeholder='Name'
                onChange={e => setFormData(prevFormData => {
                    return {
                        ...prevFormData,
                        name: e.target.value
                    }
                })}
                name="name"
                value={formData.name}
            />
            <br/>
            <Input
                type="text"
                placeholder='Price (MATIC)'
                onChange={e => setFormData(prevFormData => {
                    return {
                        ...prevFormData,
                        price: e.target.value
                    }
                })}
                name='price'
                value={formData.price}
            />
            <br/>
            <input 
                type="file"
                onChange={handleChange}
                name='picture'
                value={formData.file}
            />
            <br/>
            <SubmitButton>Submit</SubmitButton>
        </FormContainer>
    )
}

export default Sell;