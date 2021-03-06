import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema'

const app = express();



app.use('/', graphqlHTTP({
  schema,
  graphiql: true
}));

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
