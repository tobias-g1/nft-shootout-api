import axios from "axios";



const getCurrentPrice = async (req, res) => { 

    try {

        const priceUrl = 'https://api.coingecko.com/api/v3/coins/shoot?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false'

        axios.get(priceUrl)
        .then((response) => {
          res.send({
              usd: Number(response.data.market_data.current_price.usd).toFixed(15)
          })
        }).catch(err => {
          res.send({
            usd: null
        })
        })
    
    } catch (err) {
      res.send(200)
    }
   };

   export {getCurrentPrice}