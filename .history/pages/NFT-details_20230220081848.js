import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import { Button, Category, Brand } from "../components/componentsindex";
import NFTDetailsPage from "../NFTDetailsPage/NFTDetailsPage";

const NFTDetails = () => {
  return (
    <div>
      <NFTDetailsPage  />
      <Category />
      <Brand />
    </div>
  )
}

export default NFTDetails