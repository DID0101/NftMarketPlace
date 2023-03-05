import React, { useEffect,useContext, useState } from 'react'

import Style from '../styles/index.module.css'
import { NFTMarketplaceContext } from '@/Context/NFTMarketplaceContext'

import { HeroSection, Service,BigNFTSilder,Subscribe, Title, Category, Filter, NFTCard ,Collection, FollowerTab , AudioLive, Slider, Brand,} from '@/components/componentsindex'

const index = () => {
  const { checkIfWalletConnected, currentAccount } = useContext(
    NFTMarketplaceContext
  );
  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  const { fetchNFTs } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);
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
     {/* <NFTCard NFTData={nfts}/> */}
     <Slider/>
     <Collection/>
     <Brand/>
     {/* <Video/> */}
    </div>
  )
}

export default index
