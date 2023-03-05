import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BsImages } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

//INTERNAL IMPORT
import Style from "./NFTDetailsImg.module.css";
import images from "../../img";

const NFTDetailsImg = () => {
  const [description, setDescription] = useState(true);
  const [details, setDetails] = useState(true);
  const [like, setLike] = useState(false);

  const openDescription = () => {
    if (!description) {
      setDescription(true);
    } else {
      setDescription(false);
    }
  };

  const openDetails = () => {
    if (!details) {
      setDetails(true);
    } else {
      setDetails(false);
    }
  };

  const likeNFT = () => {
    if (!like) {
      setLike(true);
    } else {
      setLike(false);
    }
  };

  return (
    <div className={Style.NFTDetailsImg}>
      <div className={Style.NFTDetailsImg_box}>
        <div className={Style.NFTDetailsImg_box_NFT}>
          <div className={Style.NFTDetailsImg_box_NFT_like}>
            <BsImages className={Style.NFTDetailsImg_box_NFT_like_icon} />
            <p onClick={() => likeNFT()}>
              {like ? (
                <AiOutlineHeart
                  className={Style.NFTDetailsImg_box_NFT_like_icon}
                />
              ) : (
                <AiFillHeart
                  className={Style.NFTDetailsImg_box_NFT_like_icon}
                />
              )}
              <span>23</span>
            </p>
          </div>

          <div className={Style.NFTDetailsImg_box_NFT_img}>
            <Image
              src={images.nft_image_1}
              className={Style.NFTDetailsImg_box_NFT_img_img}
              alt="NFT image"
              width={700}
              height={800}
              objectFit="cover"
            />
          </div>
        </div>
        <div
          className={Style.NFTDetailsImg_box_description}
          onClick={() => openDescription}
        >
          <p>Description</p>
          {details ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
        </div>
        
        {description && (
          <div className={Style.NFTDetailsImg_box_description_box}>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum officiis reiciendis quidem iusto
               autem maiores expedita, fuga suscipit natus, nisi sed voluptates possimus molestiae fugiat quo 
               necessitatibus minus consequuntur voluptatibus amet dolore ratione nulla dolor nostrum inventore? 
               Perferendis, consequatur quos autem voluptate nesciunt qui laborum veniam esse aspernatur 
              voluptates labore nemo maiores. Doloribus nam ipsum hic quia ratione vero nihil.</p>
          </div>
        )}
         <div
          className={Style.NFTDetailsImg_box_details}
          onClick={() => openDetails()}
        >
          <p>Details</p>
          {details ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
          </div>
          {details && (
            <div className={Style.NFTDetailsImg_box_details_box}>
            <small> 2000 x 2000 px .IMAGE(732KB) </small>
            <p>
              <small> Contract Adress</small>
              <br></br>
              6y98e9ruee990909xsuf9v8s56v5
            </p>
            <p>
              <small>Token ID</small>
            </p>
          </div>
          )}
      </div>
    </div>
  );
};

export default NFTDetailsImg;
