import React, { useEffect, useState, useContext } from "react";

//INTRNAL IMPORT
//import Style from "../styles/searchPage.module.css";
import { Slider, Brand, Loader } from "../components/componentsindex";
import { Filter } from "../components/componentsindex";

import { NFTCardTwo } from "../collectionPage/collectionIndex";
import images from "../img";

import { Searchbar } from '@/SearchPage/searchBarindex'
const searchPage = () => {
     const nfts = [
        images.nft_image_1,
        images.nft_image_2,
        images.nft_image_3,
        images.nft_image_1,
        images.nft_image_2,
        images.nft_image_3,
        images.nft_image_1,
        images.nft_image_2,
        images.nft_image_3,

     ]
  return (
    <div>
      <div >
      
      <Searchbar
        // onHandleSearch={onHandleSearch}
        // onClearSearch={onClearSearch}
      />
      <Filter />
    <NFTCardTwo NFTData={nfts} />
      <Slider />
      <Brand />
    </div>
    </div>
  )
}

export default searchPage
