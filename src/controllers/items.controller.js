import Web3 from "web3";
import { nftAbi } from "../abi/nft-abi.js";
import { marketplaceAbi } from "../abi/marketplace-abi.js";

const rpcURL = "https://data-seed-prebsc-1-s1.binance.org:8545/";
const web3 = new Web3(rpcURL);

const getUnlistedItems = async (req, res) => {

    const { collectionAddress, userAddress } = req.params;

    const nftContract = new web3.eth.Contract(
        nftAbi,
        collectionAddress
      );
    
    let totalItems = parseInt(await nftContract.methods.balanceOf(userAddress).call())
    let items = []

    for (let i = 0; i < totalItems; i++) {
        let token = await nftContract.methods.tokenOfOwnerByIndex(userAddress, i).call()
        if (token) {
            items.push({
                owner: userAddress,
                forSale: false,
                tokenAddress: collectionAddress,
                tokenId: parseInt(token),
                metadata: [],
                price: null,
                imageUrl: null
            }) 
        }
    }
    
    res.send({
        total: totalItems,
        items
    })

}

const getSingleItem = async (req, res) => {

const { collectionAddress, tokenId } = req.params;

const nftContract = new web3.eth.Contract(
    nftAbi,
    collectionAddress
  );

const marketplaceContact = new web3.eth.Contract(
    marketplaceAbi,
    "0x65ead95f7161Efe9b11a444CCF31fDa358d01AB7"
  );
 
let currentOwner = await nftContract.methods.ownerOf(tokenId).call()

let token = {
    tokenId: tokenId,
    tokenAddress: collectionAddress,
    price: null,
    owner: null,
    forSale: false,
    metadata: [],
    imageUrl: null
}

if (currentOwner === '0x65ead95f7161Efe9b11a444CCF31fDa358d01AB7') {
    token.forSale = true;
} else {
    token.owner = currentOwner;
}

if (token.forSale) {

    const listing = await marketplaceContact.methods
    .viewAsksByCollectionAndTokenIds(collectionAddress, [parseInt(tokenId)])
    .call();

    token.owner = listing.askInfo[0][0]
    token.price = web3.utils.fromWei(listing.askInfo[0][1], 'ether');

}

res.send(token)
    
}



export { getUnlistedItems, getSingleItem };
