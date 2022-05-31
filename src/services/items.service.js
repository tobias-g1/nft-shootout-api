import Items from "../models/item.model.js";

const getItems = function (
  collectionAddress,
  sort,
  offset,
  limit,
  userAddress,
  forSale,
  attributes
) {
  return new Promise(function (resolve, reject) {
    let sortQuery = {};
    let pipeline = [];
    let matchOptions = { $match: {} };

    pipeline.push({
      $project: {
        _id: true,
        tokenId: true,
        collectionAddress: { $toLower: "$collectionAddress" },
        owner: { $toLower: "$owner" },
        listPrice: true,
        forSale: true,
        image: true,
        attributes: true,
      },
    });

    if (forSale !== null) {
      matchOptions.$match["forSale"] = forSale;
    }

    if (collectionAddress) {
      matchOptions.$match["collectionAddress"] = collectionAddress
        .toLowerCase()
        .trim();
    }

    if (userAddress) {
      matchOptions.$match["owner"] = userAddress.toLowerCase().trim();
    }

    if (sort) {
      switch (sort.toLowerCase()) {
        case "lowest":
          sortQuery = { listPrice: -1 };
          break;
        case "highest":
          sortQuery = { listPrice: 1 };
          break;
      }
    } else {
      sortQuery = { createdAt: -1 };
    }

    pipeline.push(matchOptions);

    if (attributes && Object.keys(attributes).length !== 0) {
      let orObject = {
        $and: [],
      };

      for (const [key, value] of Object.entries(attributes)) {

        const valArr = value.split(",");
        const orArray = [];

        for (let i = 0; i < valArr.length; i++) {
            orArray.push({
                $and: [
                  {
                    trait_type: key,
                    value: valArr[i],
                  },
                ],
              },)
        }

        const match = {
          $match: {
            attributes: {
              $elemMatch: {
                $or: orArray,
              },
            },
          },
        };

        pipeline.push(match);
      }
    }

    pipeline.push({
      $sort: sortQuery,
    });

    if (offset) {
      pipeline.push({
        $skip: parseInt(offset),
      });
    }

    if (limit) {
      pipeline.push({
        $limit: parseInt(limit),
      });
    }

    // Find questions relating to topic list

    Items.aggregate(pipeline)
      .then(async (questions) => {
        resolve(questions);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getUniqueAttributes = function (collectionAddress) {
  return new Promise(function (resolve, reject) {
    Items.aggregate([
      {
        $project: {
          _id: true,
          attributes: true,
          collectionAddress: { $toLower: "$collectionAddress" },
        },
      },
      { $match: { collectionAddress: collectionAddress.toLowerCase() } },
      { $unwind: "$attributes" },
      {$sort: {"attributes.value": -1}}, 
      {
        $group: {
          _id: {
            value: "$attributes.value",
            type: "$attributes.trait_type",
          },
        },
      },
      {
        $group: {
          _id: "$_id.type",
          values: {
            $push: {
              value: "$_id.value",
            },
          },
        },
      },
      { $sort: { _id: 1 } },
    ],)
      .then(async (attributes) => {
          console.log(attributes)
        resolve(attributes);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getSingle = function (collection, tokenId) {
  return new Promise(function (resolve, reject) {
    Items.findOne({ collection, tokenId }).then((item) => {
      resolve(item);
    });
  });
};

export { getItems, getUniqueAttributes, getSingle };
