const Places = require("../model/placesModel");


const createNewPlace = async (name,slug,city,state)=>{
    try{
        let place = new Places({name:name,slug:slug,city:city,state:state});
        await place.save();
        console.log(place);
        return {status:true, result:"New Place Is Successfully Created!", id:place._id}
    }catch(e){
        console.log("Create new Error", e.message);
        return {status:false, result:e.message}
    }
   
}


const getPlaces = async()=>{
    try{
        let places = await Places.find().sort({name:1});
        console.log("Pumasok?")
        console.log(places);
        return {status:true, result:places}
    }catch(e){
        console.log("Get Places Error", e);
        return {status: false, result: e.messege}
    }
}


const getPlacesByName = async(name)=>{
    try{
        let places = await Places.findOne({name});
        console.log(places);
        return {status:true, result:places}
    }catch(e){
        console.log("Get Places Error", e);
        return {status: false, result: e.messege}
    }
}



module.exports = {
    createNewPlace,
    getPlaces,
    getPlacesByName
}