import Web3 from "web3";
import { marketplaceAbi } from "../abi/marketplace-abi.js";

const rpcURL = "https://data-seed-prebsc-1-s1.binance.org:8545/";
const web3 = new Web3(rpcURL);
const marketplaceContact = new web3.eth.Contract(
  marketplaceAbi,
  "0x65ead95f7161Efe9b11a444CCF31fDa358d01AB7"
);

const nftUri = 'https://ipfs.io/ipfs/QmQWH1KvPDrYo5dpMbdG3AWc4vU4idA88eTLshEzq9wQup/metadata/'
let json = {
  "name": "NFTshootout Legend Series",
  "description": "This NFT player card is Part of the NFTshootout Legend collection V1 Series, this player is part of our Unreal engine developed football game and can be used in conjunction with our play-to-earn game to earn daily SHOO token rewards. Find out more at https://nftshootout.com/",
  "image": "def_0001.png",
  "tokenId": "0000000000",
  "attributes": [
        {
              "trait_type": "Position",
              "value": "DEF"
        },
        {
              "trait_type": "DefRating",
              "value": "70"
        },
        {
              "trait_type": "AttRating",
              "value": "20"
        },
        {
              "trait_type": "Nationality",
              "value": "Mexico"
        },
        {
              "trait_type": "Hairstyle",
              "value": "hair 4"
        },
        {
              "trait_type": "Eyes",
              "value": "eye 1"
        },
        {
              "trait_type": "Body",
              "value": "female 1"
        },
        {
              "trait_type": "Tshirt",
              "value": "blue"
        }
  ]
}

const getListedNFTs = async (req, res) => { 

  let { collectionAddress } = req.params;
  let { offset, limit } = req.query;
  let partialListed = null;
  let listed = [];

  let contractLimit = 1000;
  let contractOffset = 0;

  // Get all listed tokens
  
  while (
    !partialListed ||
    (partialListed && partialListed.tokenIds.length == contractLimit)
  ) {
    partialListed = await marketplaceContact.methods
      .viewAsksByCollection(collectionAddress, contractOffset, contractLimit)
      .call();

    let items = partialListed.tokenIds.map((item, index) => ({
      name: json.name,
      description: json.description,
      tokenId: item,
      price: web3.utils.fromWei(partialListed.askInfo[index][1], 'ether'),
      owner: partialListed.askInfo[index][0],
      forSale: true,
      tokenAddress: collectionAddress,
      metadata: json.attributes,
      imageUrl: 'https://i.ibb.co/tD41FSX/Whats-App-Image-2022-03-09-at-5-15-39-PM.jpg'
    }));

    contractOffset = contractOffset + partialListed.tokenIds.length;
    listed = listed.concat(items);
  }

  res.send(listed);
};


const getListedCollectionItemsByAddress = async (req, res) => { 

 try {
   
  let { collectionAddress } = req.params;
  let { userAddress } = req.params;

  let { offset, limit } = req.query;
  let partialListed = null;
  let listed = [];

  let contractLimit = 1000;
  let contractOffset = 0;

  // Get all listed tokens
  
  while (
    !partialListed ||
    (partialListed && partialListed.tokenIds.length == contractLimit)
  ) {
    partialListed = await marketplaceContact.methods
      .viewAsksByCollectionAndSeller(collectionAddress, userAddress, contractOffset, contractLimit)
      .call();

    let items = partialListed.tokenIds.map((item, index) => ({
      name: json.name,
      description: json.description,
      tokenId: item,
      price: web3.utils.fromWei(partialListed.askInfo[index][1], 'ether'),
      owner: partialListed.askInfo[index][0],
      tokenAddress: collectionAddress,
      forSale: true,
      metadata: json.attributes,
      imageUrl: 'https://i.ibb.co/tD41FSX/Whats-App-Image-2022-03-09-at-5-15-39-PM.jpg'
    }));

    contractOffset = contractOffset + partialListed.tokenIds.length;
    listed = listed.concat(items);
  }

  res.send(listed);
 } catch (err) {
   res.send(err)
 }
};

export { getListedNFTs, getListedCollectionItemsByAddress };
