const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
const url = "mongodb://mongo:27017";

// Database Name
const dbName = "myproject";

async function test(db) {
  const coll = db.collection("User");
  await coll.insert({ name: "vcwen", age: 15 });
  const res = await coll.findOne({ name: "vcwen" });
  console.log(res);
}
// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  test(db).finally(() => {
    client.close();
  });
});
