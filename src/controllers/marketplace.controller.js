import Web3 from "web3";
import { marketplaceAbi } from "../abi/marketplace-abi.js";
import { getItems, getUniqueAttributes } from "../services/items.service.js";

const rpcURL = "https://data-seed-prebsc-1-s1.binance.org:8545/";
const web3 = new Web3(rpcURL);
const marketplaceContact = new web3.eth.Contract(
  marketplaceAbi,
  "0x65ead95f7161Efe9b11a444CCF31fDa358d01AB7"
);

const getListedNFTs = async (req, res) => { 

  let { collectionAddress } = req.params;
  let { offset, limit, sort } = req.query;

  let attributes = req.query;

  delete attributes['offset']; 
  delete attributes['limit']; 
  delete attributes['sort']; 

  getItems(collectionAddress, sort, offset, limit, null, true, attributes).then(result => {
    res.send(result)
  })
};


const getListedCollectionItemsByAddress = async (req, res) => { 

 try {
   
  let { userAddress } = req.params;
  let { collectionAddress } = req.params;
  let { offset, limit, sort } = req.query;

  getItems(collectionAddress, sort, offset, limit, userAddress, true, null).then(result => {
    res.send(result)
  })

 } catch (err) {
   res.send(err)
 }
};

const getFilterOptions = async (req, res) => { 

  let { collectionAddress } = req.params;

  getUniqueAttributes(collectionAddress).then(result => {
    res.send(result)
  })
};

export { getListedNFTs, getListedCollectionItemsByAddress, getFilterOptions };
