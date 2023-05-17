const mongoos = require("mongoose");
async function connectDb() {
  const url = `mongodb+srv://anupamsingh345sne:Anupam30786@newtondb.ecdyozl.mongodb.net/WhatsApp`;
  try {
    await mongoos.connect(url);

    console.log("db connected");
  } catch (e) {
    console.log(e);
  }
}
connectDb();
