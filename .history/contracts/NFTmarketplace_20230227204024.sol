// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// internal import for nft openzeppline

import "@openzeppelin/contracts/utils/Counters.sol";
//counter
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract NFTMarketplace is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;

    uint256 listingPrice = 0.025 ether;
    address payable owner;

    mapping(uint256 => MarketItem) private idToMarketItem;

    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    event MarketItemCreated(
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    modifier onlyOwner(){
        require(
            msg.sender == owner,
            "only owner of the marketplace can change the listing price"
        );
        _;
    }

    constructor() ERC721("NFT Metavarse Token ","MYNFT"){
        owner == payable(msg.sender);
    }
    function updateListPrice(uint256 _listingPrice) public payable{
        listingPrice = _listingPrice;
    }
    function getListingPrice() public view returns (uint256){
        return listingPrice;
    }
    // create NFT token Function 

    function createToken(string memory tokenURI, uint256 price ) public payable returns(uint256){
    _tokenIds.increment();

    uint256 newTokenId =  _tokenIds.current();

    _mint(msg.sender , newTokenId);
    _setTokenURI(newTokenId, tokenURI);  
    
    createMarketItem(newTokenId, price);

    return newTokenId;
    }

    //create market item  
     function createMarketItem(uint256 tokenId , uint256 price) private{
        require (price > 0 , "price must be al lest 1");
        require(msg.value == listingPrice, "Pric must be equal to listing price");

        idToMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            price,
            false
        );
        _transfer(msg.sender, address(this), tokenId);

        emit MarketItemCreated(tokenId, msg.sender, address(this), price, false);
     }
        // function for resale token 
        function reSellToken (uint256 tokenId , uint256 price ) public payable{
            require(idToMarketItem[tokenId].owner == msg.sender, "Only item can perform this oparation ");

            require(msg.value == listingPrice, "Price must be equal to listing price");

            idToMarketItem[tokenId].sold = false;
            idToMarketItem[tokenId].price = price;
            idToMarketItem[tokenId].seller = payable(msg.sender);
            idToMarketItem[tokenId].owner = payable(address(this));

            _itemsSold.decrement();

            _transfer(msg.sender, address(this), tokenId);

        }

        //function create market ItemSale

        function createMarketSale( uint256 tokenId) public payable{
            uint256 price = idToMarketItem[tokenId].price;

            require(
                msg.value == price,
                 "please submit the asking price in order to complete the purchase"
                 );

            idToMarketItem[tokenId].owner = payable(msg.sender);
            idToMarketItem[tokenId].sold = true;
            idToMarketItem[tokenId].owner = payable(address(0));

            _itemsSold.increment(); 
            _transfer(address(this), msg.sender, tokenId);

            payable(owner).transfer(listingPrice);
            payable(idToMarketItem[tokenId].seller).transfer(msg.value);
        }
        //Unsold NFT data 
        function fetchMarketItems() public view returns(MarketItem[] memory){
            uint256 itemCount = _tokenIds.current();
            uint256 unSoldItemCount = _tokenIds.current() - _itemsSold.current();
            uint256 currentIndex = 0 ;

            MarketItem[] memory items = new MarketItem[](unSoldItemCount);
            for(uint256 i=0; i < itemCount ; i++){
                if (idToMarketItem[i+1].owner == address(this)){
                    uint256 currentId = i + 1 ;
                    MarketItem storage currentItem = idToMarketItem[currentId];
                    items[currentIndex] = currentItem;
                    currentIndex += 1;
                }
            }
            return items;
        }

        // purchase item 
        function fetchMyNFT() public view returns(MarketItem[] memory){
            uint256 totalCount = _tokenIds.current();
            uint itemCount = 0;
            uint256 currentIndex = 0;

            for (uint256 i = 0 ; i < totalCount; i++){
                if(idToMarketItem[i + 1].owner == msg.sender){
                    itemCount +=1 ;
                }
            }
            MarketItem[] memory items = new MarketItem[](itemCount);
            for(uint256 i = 0; i < totalCount; i++){
                if(idToMarketItem[i+1].owner == msg.sender){
                uint256 currentId = i + 1 ; 
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex +=1;
                } 
            }
            return items;
    }
    // single user item 
    
    function fetchItemsListed() public view returns (MarketItem[] memory) {
        uint256 totalCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
                
}
