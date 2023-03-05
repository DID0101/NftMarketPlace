import React,{useState,useEffect,useContext} from 'react'
import Web3Modal from 'web3modal'
import { ethers } from "ethers";
import Router from 'next/router'
import axios from 'axios';
import {create as ipfsHttpClient} from "ipfs-http-client"

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
        return ;
    } catch (error) {
        console.log("Something wrong connectin with contract ")
    }
}

export const NFTMarketplaceContext = React.createContext()
export const NFTMarketplaceProvider = ({children})=>{
    const titlrData = 'Discover , collect , and sell NFTs'
    const checkContract = async()=>{
        const contract = await connectingWithSmartContract()
        console.log(contract)
    }
    return (
        <NFTMarketplaceContext.Provider value={{checkContract,titlrData}}>{children}</NFTMarketplaceContext.Provider>
    )
}