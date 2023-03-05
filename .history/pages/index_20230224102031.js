import React, { useEffect } from 'react'

import Style from '../styles/index.module.css'
import { NFTMarketplaceContext } from '@/Context/NFTMarketplaceContext'

import { HeroSection, Service,BigNFTSilder,Subscribe, Title, Category, Filter, NFTCard ,Collection, FollowerTab , AudioLive, Slider, Brand, Video} from '@/components/componentsindex'

const index = () => {
  const {checkContract} = useContext(NFTMarketplaceContext)
  useEffect(()=>{
    checkContract()
  },[]) 
  return (
    <div className={Style.homePage}>
      <HeroSection/>
      <Service/>
      <BigNFTSilder/>
      <AudioLive/>
      <Subscribe/>
      <Title
        heading="Audio Collection"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />
      <FollowerTab/>
       <Filter/>

      <Category/>
      <Filter/>
     <NFTCard/>
     <Slider/>
     <Collection/>
     <Brand/>
     {/* <Video/> */}
    </div>
  )
}

export default index
