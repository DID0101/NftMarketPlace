import React, { useEffect, useState } from "react";
import { BsSearch, BsArrowRight } from "react-icons/bs";
import Style from "./SearchBar.module.css"
const Searchbar = ({ onHandleSearch, onClearSearch }) => {
    const [search, setSearch] = useState("");
  const [searchItem, setSearchItem] = useState(search);

//   useEffect(() => {
//     const timer = setTimeout(() => setSearch(searchItem), 1000);
//     return () => clearTimeout(timer);
//   }, [searchItem]);

//   useEffect(() => {
//     if (search) {
//       onHandleSearch(search);
//     } else {
//       onClearSearch();
//     }
//   }, [search]);

  return (
    <div className={Style.SearchBar}>
      <div className={Style.SearchBar_box}>
        <BsSearch className={Style.SearchBar_box_icon} />
        <input
          type="text"
          placeholder="Type yout keyword..."
          onChange={(e) => setSearchItem(e.target.value)}
          value={searchItem}
        />
        <BsArrowRight className={Style.SearchBar_box_icon} />
      </div>
    </div>
  )
}

export default Searchbar