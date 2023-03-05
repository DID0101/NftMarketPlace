import React,{useState,useEffect,useContext} from 'react'
import web3Modal from 'web3modal'
import { ethers } from "ethers";
import Router from 'next/router'
 
import {NFTMarketplaceAddress,NFTMarketplaceABI }  from './constants'


export const NFTMarketplaceContext = React.createContext()
export const NFTMarketplaceProvider = ({children})=>{
    const titlrData = "Discover , collect , and sell NFTs"
    return (
        <NFTMarketplaceContext.Provider value={{titlrData}}>{children}</NFTMarketplaceContext.Provider>
    )
}