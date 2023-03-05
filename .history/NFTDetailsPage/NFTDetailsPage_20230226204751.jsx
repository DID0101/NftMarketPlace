import React from 'react'

import { NFTDiscription,NFTTabs,NFTDetailsImg } from './NFTDetailsIndex'
import Style from './NFTDetailsPage.module.css'

const NFTDetailsPage = ({nft}) => {
  return (
    <div className={Style.NFTDetailsPage}>
      <div className={Style.NFTDetailsPage_box}>
        <NFTDetailsImg nft={nft} />
        <NFTDiscription nft={nft} />
      </div>
    </div>
  )
}

export default NFTDetailsPage