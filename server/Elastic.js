const {
  Client
} = require('@elastic/elasticsearch');
const client = new Client({
  node: 'http://es01:9200'
});

const PAGE_SIZE = 50;

const searchViaRating = async (index, minRating, maxRating, minRatingCount, maxRatingCount, page, callback) => {
  client.search({
      index: index,
      from: page * PAGE_SIZE,
      size: PAGE_SIZE,
      body: {
        sort: [
          {
            averageRating: {
              order: "desc"
            }
          }
        ],
        query: {
          bool: {
            must: [{
                range: {
                  averageRating: {
                    gte: minRating,
                    lte: maxRating
                  }
                }
              },
              {
                range: {
                  numRatings: {
                    gte: minRatingCount,
                    lte: maxRatingCount
                  }
                }
              }
            ]
          }
        }
      }
    })
    .then(result => callback(result))
    .catch(err => callback(err))
};

const searchViaID = async (index, id, callback) => {
  console.log(`${index}ID`);
  client.search({
    index: `${index}-averages`,
    body: {
      sort: [
        {
          numRatings: {
            order: "desc"
          }
        }
      ],
      query: {
        match: {
          [`${index}ID`]: id
        }
      }
    }
  })
  .then(result => callback(result))
  .catch(err => callback(err))
};

module.exports = {
  searchViaRating,
  searchViaID
};