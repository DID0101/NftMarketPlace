import React,{useState,useEffect,useContext} from 'react'
import web3Modal from 'web3modal'
import {ethers} from "ether"
import Router from 'next/router'
 
import {NFTMarketplaceAddress,NFTMarketplaceABI }  from './constants'


export const NFTMarketplaceContext = React.createContext()
export const NFTMarketplaceProvider = ({children})=>{
    return (
        <NFTMarketplaceContext.Provider value={{}}>{children}</NFTMarketplaceContext.Provider>
    )
}