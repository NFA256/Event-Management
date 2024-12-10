//-----------database Connection AND mongoose connection


const mongoose  = require("mongoose");
async function connectionDB() {
  try {
    const connectDB = await mongoose.connect(process.env.DB); //DB env ma jo ha variable
    if (connectDB) {
      console.log("MONGODB Atlas connected successfully!!!");
    }
  } catch (error) {
    console.log("Connectitivity error", error);
  }
}
//---export function
module.exports = { connectionDB };