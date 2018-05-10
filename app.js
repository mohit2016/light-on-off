var express    = require('express'),
mongoose   = require("mongoose");

var app = express();

app.set('view engine','ejs');


mongoose.connect("mongodb://localhost/LightONOFF"); //Database Connection Call

// Light Schema
var LightSchema = new mongoose.Schema({
    "ON" : Boolean
});

// Creating Model corresponding to the Schema
var Light =  mongoose.model("Light", LightSchema);



// Run this only one time to create a entry with default lights : turned ON

// Light.create({
//     ON : true
// },function(err,light){
//     if(err)
//         console.log(err);
//     else
//         console.log(light);
// })



// Home Route
app.get("/",function(req,res){
    Light.find({},function(err,light){
                if(err)
                    console.log(err);
                else{
                    res.render("index.ejs" ,{light : light});
                }
            });
});

// route to turn ON/OFF
app.post("/light",function(req,res){
    Light.find({},function(err,light){

        // Check if the light is ON or OFF 
        if(light[0].ON){
                // TURN OFF the lights in database
                Light.update({
                         ON : false
                     }, function(err, light){
                    if(err)
                        console.log(err);
                    else
                        res.redirect("/");        
                });
        }else{
                // TURN ON the lights
                Light.update({
                    ON : true
                }, function(err, light){
               if(err)
                   console.log(err);
               else
                   res.redirect("/");        
           });
        }
    });
});


// creating server
app.listen(3000, function(req,res){
    console.log("server started...");
});