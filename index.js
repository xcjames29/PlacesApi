const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(morgan("dev"));
app.use(express.static("static"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
const PORT = 8111;
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/placesAPI", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Mongo DB Connected")
}).catch((e)=>{
    console.log(e.message);
});


const PlacesController = require("./controller/placesController");

app.get("/places",async(req,res)=>{
    try{
        let PlacesData = await PlacesController.getPlaces();

        if(PlacesData.status){
            res.status(200).send(JSON.stringify(PlacesData.result))
        }
        else{
            res.status(400).send(JSON.stringify(PlacesData.result));
        }
    }
    catch(e){
        console.log(e.messege);
        res.status(400).send(e.messege);
    }
})

app.post("/places",async(req,res)=>{
    try{
        console.log("Pumasok?",req.body);
        let {name,slug,city,state} = req.body;
        let places = await PlacesController.createNewPlace(name,slug,city,state);
        console.log(places);
        if(places.status){
            console.log("Success",places.result);
            res.status(200).send(places.result);
        }
        else{
            res.status(400).send(places.result);
        }

    }catch(e){
        console.log(e.messege);
        res.status(400).send(e.messege);
    }
})




app.listen(PORT,()=>{
    console.log("Server is listening at PORT: " +PORT);
})

