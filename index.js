// yfr5sK3qQw291GCx
// portfolio

const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.v2wiu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("Portfolio");
    const projectInfo = database.collection("projectInfo");

    app.get("/projects", async (req, res) => {
      const query = projectInfo.find({});
      const result = await query.toArray();
      res.json(result);
    });

    app.get("/projects/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const searchQuery = { _id: ObjectId(id) };
      const result = await projectInfo.findOne(searchQuery);
      res.send(result);
    });
  } finally {
    //   await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Allah is Almighty");
});

app.listen(port, () => {
  console.log("listening from ", port);
});
