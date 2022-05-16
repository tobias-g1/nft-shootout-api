import Web3 from "web3";
import { marketplaceAbi } from "../abi/marketplace-abi.js";

const rpcURL = "https://data-seed-prebsc-1-s1.binance.org:8545/";
const web3 = new Web3(rpcURL);
const marketplaceContact = new web3.eth.Contract(
  marketplaceAbi,
  "0x65ead95f7161Efe9b11a444CCF31fDa358d01AB7"
);

const nftUri = 'https://ipfs.io/ipfs/QmQWH1KvPDrYo5dpMbdG3AWc4vU4idA88eTLshEzq9wQup/metadata/'
  
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
      tokenId: item,
      price: web3.utils.fromWei(partialListed.askInfo[index][1], 'ether'),
      owner: partialListed.askInfo[index][0],
      forSale: true,
      tokenAddress: collectionAddress,
      metadata: [],
      imageUrl: null
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
      tokenId: item,
      price: web3.utils.fromWei(partialListed.askInfo[index][1], 'ether'),
      owner: partialListed.askInfo[index][0],
      tokenAddress: collectionAddress,
      forSale: true,
      metadata: [],
      imageUrl: null
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
