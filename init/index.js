const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

main()
    .then(() =>{
        console.log("DB Connected to Express");
    })
    .catch((err) =>{
        console.error(err);
    })

async function main(){
    mongoose.connect("mongodb+srv://user:user123@airbnb.dslfvzd.mongodb.net/?retryWrites=true&w=majority&appName=airbnb");
}

const initDB = async () =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((listing) => { 
        return {...listing,owner: "68f62d839fff182f2f13371f"}
    })
    await Listing.insertMany(initData.data);
    // console.log("Data was initialized");
};

initDB();
