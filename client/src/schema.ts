export interface ImageProps {
    hovered?: boolean | React.MutableRefObject<null>
    image?: string
}
export interface NFTItemComp {
    image: string, 
    name: string, 
    price: string, 
    tokenId: number
}
export interface NFT {
    creator: string,
    image: string,
    name: string,
    owner: string
    price: string,
    resell: boolean,
    seller: string,
    tokenId: number | string,
}
export interface RawNFT { 
    // NFT data stroed on the blockchain (everything except the image)
    creator: string,
    name: string,
    owner: string
    price: string,
    resell: boolean,
    seller: string,
    tokenId: number | string,
}
export interface MarketplaceContextProps {
    connected: boolean, 
    currentAccount: string,
    loadingState: string,
    myCreations: NFT[],
    myNFTs: NFT[], 
    nfts: NFT[],
    buyItem: (nft: NFT) => Promise<void>, 
    getContract: () => Promise<any>, //or ethers.Contract
    loadCreations: () => Promise<void>,
    loadNFTs: () => Promise<void>, 
    loadMyNFTs: () => Promise<void>,
    reSell: (nft: NFT | undefined, price: string) => Promise<void>,
    setMyCreations: React.Dispatch<React.SetStateAction<NFT[]>>,
    setMyNFTs: React.Dispatch<React.SetStateAction<NFT[]>>,
    setNfts: React.Dispatch<React.SetStateAction<NFT[]>>,
}