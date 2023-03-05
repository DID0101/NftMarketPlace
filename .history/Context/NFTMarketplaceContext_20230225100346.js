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
        } catch (error) {
            console.log("Something wrong connectin with wallet ",error)

        }
    }

    return (
        
        <NFTMarketplaceContext.Provider value={{titlrData}}>{children}</NFTMarketplaceContext.Provider>
    )
}