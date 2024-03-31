const { DynamoDBClient, ListTablesCommand, GetItemCommand } = require("@aws-sdk/client-dynamodb");

const express = require('express')
const app = express()
const port = 3000

async function getItem(){
  const client = new DynamoDBClient({ region: "us-west-1" });
  const input = { TableName: "TestTable", Key: { PokemonID: {S : "1"} } }
  const command = new GetItemCommand(input);
  try {
    const response = await client.send(command);
    return response
  } catch (err) {
    console.error(err);
  }
}

app.get('/', async (req, res) => {
  const response = await getItem();
  const pokemon = response.Item.Name.S
  console.log(pokemon)
  res.send(pokemon);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




// (async () => {
//   const client = new DynamoDBClient({ region: "us-west-1" });
//   const input = { TableName: "TestTable", Key: { PokemonID: {S : "1"} } }
//   const command = new GetItemCommand(input);
//   try {
//     const response = await client.send(command);
//     console.log(response.Item);
//   } catch (err) {
//     console.error(err);
//   }
// })();