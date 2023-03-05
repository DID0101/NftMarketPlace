import React from 'react'

import { NFTDiscription,NFTTabs,NFTDetailsImg } from './NFTDetailsIndex'
import Style from './NFTDetailsPage.module.css'

const NFTDetailsPage = () => {
  return (
    <div className={Style.NFTDetailsPage}>
      <div className={Style.NFTDetailsPage_box}>
        <NFTDetailsImg />
        <NFTDiscription />
      </div>
    </div>
  )
}

export default NFTDetailsPage