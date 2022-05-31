import Web3 from "web3";
import { nftAbi } from "../abi/nft-abi.js";
import { marketplaceAbi } from "../abi/marketplace-abi.js";
import { getItems, getSingle } from "../services/items.service.js";

const rpcURL = "https://data-seed-prebsc-1-s1.binance.org:8545/";
const web3 = new Web3(rpcURL);

let json = {
  name: "NFTshootout Legend Series",
  description:
    "This NFT player card is Part of the NFTshootout Legend collection V1 Series, this player is part of our Unreal engine developed football game and can be used in conjunction with our play-to-earn game to earn daily SHOO token rewards. Find out more at https://nftshootout.com/",
  image: "def_0001.png",
  tokenId: "0000000000",
  attributes: [
    {
      trait_type: "Position",
      value: "DEF",
    },
    {
      trait_type: "DefRating",
      value: "70",
    },
    {
      trait_type: "AttRating",
      value: "20",
    },
    {
      trait_type: "Nationality",
      value: "Mexico",
    },
    {
      trait_type: "Hairstyle",
      value: "hair 4",
    },
    {
      trait_type: "Eyes",
      value: "eye 1",
    },
    {
      trait_type: "Body",
      value: "female 1",
    },
    {
      trait_type: "Tshirt",
      value: "blue",
    },
  ],
};

const getUnlistedItems = async (req, res) => {
  try {
   
    let { userAddress } = req.params;
    let { collectionAddress } = req.params;
    let { offset, limit, sort } = req.query;
  
    getItems(collectionAddress, sort, offset, limit, userAddress, false).then(result => {
      res.send(result)
    })
  
   } catch (err) {
     res.send(err)
   }
};

const getSingleItem = async (req, res) => {
  const { collectionAddress, tokenId } = req.params;
  try {
    getSingle(collectionAddress, tokenId).then(result => {
      res.send(result)
    })
  } catch (err) {
    res.send({});
  }
};

export { getUnlistedItems, getSingleItem };
