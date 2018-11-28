import { 
  GraphQLObjectType, 
  GraphQLInt, 
  GraphQLString,
  GraphQLList,
  GraphQLSchema
} from 'graphql';
import axios from 'axios'


// Coin Type
const CoinType = new GraphQLObjectType({
  name: 'Coin',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    symbol: { type: GraphQLString },
    website_slug: { type: GraphQLString },
  })
})

// Root Qwery
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    coins: {
      type: new GraphQLList(CoinType),
      resolve(parent, args) {
        return axios.get('https://api.coinmarketcap.com/v2/listings').then( res => res.data.data );
      }
    },
    
    coin: {
      type:  CoinType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return axios.get(`https://api.coinmarketcap.com/v2/ticker/${args.id}`).then(res => res.data.data )
      }
    }
  }
})

export default new GraphQLSchema({
  query: RootQuery
});