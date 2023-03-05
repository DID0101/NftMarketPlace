import React, { useState, useEffect, useContext } from "react";

//INTERNAL IMPORT
// import Style from "../styles/author.module.css";
import { Banner, NFTCardTwo } from "../collectionPage/collectionIndex";
import { Brand, Title } from "../components/componentsindex";
import FollowerTabCard from "../components/FollowerTab/FollowerTabCard/FollowerTabCard";
 import images from "../img";
 
 import {
    AuthorProfileCard,
    AuthorTaps,
    AuthorNFTCardBox,
  } from "../authorPage/componentIndex";
 // import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";
  

const author = () => {
        const popularArray = [
          images.user1,
          images.user2,
          images.user3,
          images.user4,
          images.user5,
          images.user6,
          images.user7,
          images.user8,
        ];
    const [collectiables, setCollectiables] = useState(true);
  const [created, setCreated] = useState(false);
  const [like, setLike] = useState(false);
  const [follower, setFollower] = useState(false);
  const [following, setFollowing] = useState(false)
  
  
  return (
    <div>
      <AuthorProfileCard/>
      <AuthorTaps
        setCollectiables={setCollectiables}
        setCreated={setCreated}
        setLike={setLike}
        setFollower={setFollower}
        setFollowing={setFollowing}
        />
        <AuthorNFTCardBox
        collectiables={collectiables}
        created={created}
        like={like}
        follower={follower}
        following={following}
         
        />
        
        
        {/* {popularArray.map((i,el)=>(
            <FollowerTabCard key={i+1} i={i}  el={el} />
        ))} */}
    </div>
  )
}

export default author