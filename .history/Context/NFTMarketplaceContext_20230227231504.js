import React,{useState,useEffect,useContext} from 'react'
import Web3Modal from 'web3modal'
import { ethers } from "ethers";
import Router from 'next/router'
import axios from 'axios';
import {create as ipfsHttpClient} from "ipfs-http-client"

//const client = ipfsHttpClient("https://ipfs.infura.io:5001/ipa/v0")

const projectId = "2MGrEQ4ZNqTjaBl2t2mjiYNfxIH";
const projectSecretKey = "63e145267e75f823d32e254f178d21c2";
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecretKey}`).toString(
  "base64"
)}`;

const subdomain = "https://ddr-nftmarketplace.infura-ipfs.io";

const client = ipfsHttpClient({
  host: "infura-ipfs.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

//INTERNAL  IMPORT
import {
    NFTMarketplaceAddress,
    NFTMarketplaceABI,
    transferFundsAddress,
    transferFundsABI,
  } from "./constants";
  
  //---FETCHING SMART CONTRACT
  const fetchContract = (signerOrProvider) =>
    new ethers.Contract(
      NFTMarketplaceAddress,
      NFTMarketplaceABI,
      signerOrProvider
    ); 
// connecting with smart contract    

const connectingWithSmartContract = async ()=>{
    try {
        const web3modal = Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner()
        const contract = fetchContract(signer)
        return contract;
    } catch (error) {
        console.log("Something wrong connectin with contract ")
    }
}

export const NFTMarketplaceContext = React.createContext()
export const NFTMarketplaceProvider = ({children})=>{
    const titlrData = 'Discover , collect , and sell NFTs'
   // usestate 

    const [currentAccount, setCurrentAccount] = useState("")

    // check wallet is connected 
    const checkIfWalletConnected = async ()=>{
        try {
            if(!window.ethereum) return console.log("install meta mask ")

            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            })
            if (accounts.length){
                setCurrentAccount(accounts[0])
            }
            else{
                console.log("No account connected")
            }
      console.log(currentAccount)
      
            
        } catch (error) {
            console.log("Something wrong connectin with wallet ",error)

        }
    }
    useEffect(()=>{
        checkIfWalletConnected()
    },[])
// connect wallet function
const connectWallet = async ()=>{
try {
    if(!window.ethereum) return console.log("install meta mask ")

            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",

            })
            setCurrentAccount(accounts[0])
            window.location.reload()
} catch (error) {
    console.log("Something wrong connectin with wallet ",error)

}
}
// upload to ipfs funstion 

const uploadToIPFS = async (file) =>{
    try {
        const added =await client.add({content:file})
        const url = `${subdomain}/ipfs/${added.path}`
        return url
    } catch (error) {
        console.log("Something wrong connectin with wallet ",error)

    }
}
// create nft  func
const createNFT = async (name, price, image, description, router) => {
  if (!name || !description || !price || !image)
    // return setError("Data Is Missing"), setOpenError(true);

  const data = JSON.stringify({ name, description, image });
    try {
      const added = await client.add(data);

      const url = `https://infura-ipfs.io/ipfs/${added.path}`;

      await createSale(url, price);
      router.push("/searchPage");
    } catch (error) {
      setError("Error while creating NFT");
      setOpenError(true);
    }
  };
// create sale func
  const createSale = async (url, formInputPrice, isReselling, id) => {
    try {
      console.log(url, formInputPrice, isReselling, id);
      const price = ethers.utils.parseUnits(formInputPrice, "ether");

      const contract = await connectingWithSmartContract();

      const listingPrice = await contract.getListingPrice();

      const transaction = !isReselling
        ? await contract.createToken(url, price, {
            value: listingPrice.toString(),
          })
        : await contract.resellToken(id, price, {
            value: listingPrice.toString(),
          });

      await transaction.wait();
      console.log(transaction);
    } catch (error) {
      setError("error while creating sale");
      setOpenError(true);
      console.log(error);
    }
  };
  // fetch NFTs func
  const fetchNFTs = async () => {
    try {
        provider=new ethers.providers.JsonRpcProvider()
        const contract = fetchContract(provider )
        
        const data = await contract.fetchMarketItem();

        const items = await Promise.all()
        data.map(async({tokenId,seller,owner,price:unformattedPrice}) => {
            const tokenURI = await contract.tokenURI(tokenId);

            const {
                data: { image, name, description },
              } = await axios.get(tokenURI, {});
              const price = ethers.utils.formatUnits(
                unformattedPrice.toString(),
                "ether"
              )
              return {
                price,
                tokenId: tokenId.toNumber(),
                seller,
                owner,
                image,
                name,
                description,
                tokenURI,
              };
        }
        )
        console.log(items);
      return items;
    } catch (error) {
        console.log(error);
        
    }
  }
  useEffect(() => {
    // if (currentAccount) {
    fetchNFTs();
    // }
  }, []);
// fetch my nfts or listed 
const fetchMyNFTsOrListedNFTs = async (type) => {
    try {
      if (currentAccount) {
        const contract = await connectingWithSmartContract();

        const data =
          type == "fetchItemsListed"
            ? await contract.fetchItemsListed()
            : await contract.fetchMyNFTs();

        const items = await Promise.all(
          data.map(
            async ({ tokenId, seller, owner, price: unformattedPrice }) => {
              const tokenURI = await contract.tokenURI(tokenId);
              const {
                data: { image, name, description },
              } = await axios.get(tokenURI);
              const price = ethers.utils.formatUnits(
                unformattedPrice.toString(),
                "ether"
              );

              return {
                price,
                tokenId: tokenId.toNumber(),
                seller,
                owner,
                image,
                name,
                description,
                tokenURI,
              };
            }
          )
        );
        return items;
      }
    } catch (error) {

      console.log("Error while fetching listed NFTs");
      // setOpenError(true);
    }
  }; 

  // buy NFT Func
  const buyNFT = async (nft) =>{
    try {
        const contract = await connectingWithSmartContract();
        const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
  
        const transaction = await contract.createMarketSale(nft.tokenId, {
          value: price,
        });
  
        await transaction.wait();
        router.push("/author");
 
    } catch (error) {
        console.log("Error while buying NFT",error);

    }
  }

    return (
        
        <NFTMarketplaceContext.Provider value={{
            checkIfWalletConnected,
            connectWallet,
            uploadToIPFS,
            createNFT,
            createSale,
            fetchNFTs,
            fetchMyNFTsOrListedNFTs,
            buyNFT,
            currentAccount,
            titlrData,
        }}>{children}</NFTMarketplaceContext.Provider>
    )
}