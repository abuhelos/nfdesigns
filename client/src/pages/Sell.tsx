import React, {useState, useContext, useEffect} from 'react'
import {MarketplaceContext} from '../context/MarketplaceContext'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'

import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import {create as ipfsHttpClient} from 'ipfs-http-client'
import { contractABI, contractAddress } from '../utils/constants'

import {Buffer} from 'buffer'

interface FormData {
    name: string,
    price: string,
    file: any
}

const  imageIcon = '/assets/image-icon.svg'
const  deleteX = '/assets/delete-x.svg'

const projectId = '2FX4d5dPnCGAufDfOsFmZrCZ6iL'; //This should not be exposed
const projectSecret = 'f54da779adf3bdffe3e725b5f498fada'; //This should not be exposed

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

export default function Sell() {
    const [fileUrl, setFileUrl] = useState<string>("")
    const [filePreview, setFilePreview] = useState<Blob|null>()
    const [preview, setPreview] = useState<string|null>()

    const {loadNFTs, getContract} = useContext(MarketplaceContext);
    const {register, handleSubmit, formState: {errors}} = useForm();

    useEffect(() => {
        if(filePreview) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string)
            };
            reader.readAsDataURL(filePreview);
        } else {
            setPreview(null);
        }
    },[filePreview])

    async function handleFile(e: React.ChangeEvent<HTMLInputElement>): Promise<void> {
        if(!e.target.files){return}
        const file = e.target.files[0]
        if(!file){return} // Prevents deleting image preview if file selection is canceled (Google Chrome) 
        setFilePreview(file)
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

    async function uploadToIPFS(name: string, price: string, fileUrl: string): Promise<string|undefined> {
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

    async function listItemForSale(data: FormData): Promise<void> {
        const contract = await getContract();
        const url = await uploadToIPFS(data.name, data.price, fileUrl)
        const price = ethers.utils.parseUnits(data.price, 'ether')
        
        let listingPrice: string | number = await contract.getListingPrice()
        listingPrice = listingPrice.toString()

        try {
            let transaction = await contract.createToken(url, price, {value: listingPrice})
            await transaction.wait()
        } catch (e) {
            console.log(e)
            if(e.data.message.includes('insufficient funds')){
                alert('Error: Insufficient Funds.')
            } else {
                alert(`Error: ${e.message}\nMessage: ${e.data.message ? e.data.message : e.data.details}`)
            }
        }
        loadNFTs();
    }

    let clicked = false; //Prevents x button and file input from being selected together
    return (
        <FormContainer onSubmit={handleSubmit(listItemForSale)}>
            <header style={{fontSize:'35px', fontWeight: '600', marginBottom: '20px'}}>Sell Item</header>
            <FormField>
                <Label>Name</Label>
                <Input
                    placeholder='Name'
                    type="text"
                    {...register("name", {required: true, maxLength: 20})}
                />
                {errors.name && <p style={{color: 'red', opacity: .6}}>Please Enter a Name. Max Length 20.</p>}
            </FormField>
            <FormField>
                <Label>Price</Label>
                <Input
                    placeholder='Enter Price (MATIC)'
                    type="number"
                    min="0"
                    step="any"
                    {...register('price', {required: true, maxLength: 10})}
                />
                {errors.price && <p style={{color: 'red', opacity: .6}}>Please Check the Price</p>}
            </FormField>
            <FormField>
                <Label>Image</Label>
                <FileInput htmlFor="fileInput" onClick={e=>{
                    if(clicked===true) {
                        e.preventDefault()
                    }
                }}>
                    <input
                        id="fileInput"
                        type="file"
                        style={{display: "none"}}
                        accept="image/*"
                        onClick={(event)=>{(event.target as HTMLInputElement).value = ""}}
                        {...register('file', {required: true, onChange: (e) => handleFile(e)})}
                    />
                    {preview ? (
                        <>
                            <img
                                style={{borderRadius: "10px"}}
                                src = {preview}
                                height="257px"
                                width="350px"
                            />
                            <DeleteButton 
                                src = {deleteX}
                                height="50px"
                                onClick={() => {
                                    setFileUrl("")
                                    setFilePreview(null)
                                    clicked=true;
                                }}
                            />
                        </>  
                    ) : (
                        <img 
                            style={{marginTop:'auto', marginBottom:'auto'}}
                            src={imageIcon}
                            height="84px"
                        />
                    )}
                </FileInput>
                {errors.file && <p style={{color: 'red', opacity: .6}}>Please add an image.</p>}
            </FormField>
            <SubmitButton>Submit</SubmitButton>
        </FormContainer>
    )
}

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: left;
    margin-top 20px;
    margin-left: auto;
    margin-right: auto;
    width: 80%;
`
const FormField = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
`
const Label = styled.label`
    font-weight: 600;
    font-size: 18px;
`
const Input = styled.input`
    width: 80%;
    border: 2px solid LightGray;
    border-radius: 8px;
    margin-top: 5px;
    padding: 4px 4px 4px 10px;
    &:: placeholder {
        opacity: .3;
    }
`
const FileInput = styled.label`
    display: flex;
    justify-content: center;
    border: 2px dashed LightGray;
    border-radius: 10px;
    height: 257px;
    width: 350px;
    &:hover {
        cursor: pointer;
        background-color: DarkGray;
    }
`
const DeleteButton = styled.img`
    margin-left: -50px;
    &:hover {
        scale: 1.1;
    }
`
const SubmitButton = styled.button`
    height: 50px;
    width: 150px;
    color: white;
    border-radius: 10px;
    text-align: center;
    background-color: black;

    &:hover {
        cursor: pointer;
    }
`