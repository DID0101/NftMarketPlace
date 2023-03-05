import React from "react";
import Image from "next/image";
import { FaUserAlt, FaRegImage, FaUserEdit } from "react-icons/fa";
import { MdHelpCenter } from "react-icons/md";
import { TbDownloadOff, TbDownload } from "react-icons/tb";
import Link from "next/link";

//INTERNAL IMPORT
import Style from "./Profile.module.css";
import images from "../../../img";

const Profile = ({currentAccount}) => {
  return (
    <div className={Style.profile}>
      <div className={Style.profile_account}>
        <Image src={images.user1} width={50} height={50} alt='user profile' className={Style.profile_account_img}/>
        <div className={Style.profile_account_info}>
          <p>Shohradovic</p>
          {/* <small>{currentAccount.slince(0.18)}</small> */}
          <small>848446468....</small>

        </div>
      </div>
      <div className={Style.profile_menu}>
        <div className={Style.profile_menu_one}>
          <div className={Style.profile_menu_one_item}>
            <FaUserAlt/>
            <p><Link href={{pathname:'/author'}}>My Profile</Link></p>
          </div>
          <div className={Style.profile_menu_one_item}>
            <FaRegImage />
            <p><Link href={{pathname:'/author'}}>My Items</Link></p>
          </div>
          <div className={Style.profile_menu_one_item}>
            <FaUserEdit/>
            <p><Link href={{pathname:'/edit-profile'}}>Edit Profile</Link></p>
          </div>
        </div>
        <div className={Style.profile_menu_one}>
          <div className={Style.profile_menu_one_item}>
            <MdHelpCenter/>
            <p>
              <Link href={{pathname:'/help'}}>Help</Link>
            </p>
            <TbDownload/>
            <p>
              <Link href={{pathname:'/disconnect'}}>Disconnect</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile