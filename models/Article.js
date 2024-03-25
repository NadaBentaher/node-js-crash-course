const mongoose=require("mongoose"); //t3ayet lil biblio 
const Schema=mongoose.Schema
const articleSchema=new Schema({
    title: String,
    body: String,
    numberOfLikes: Number
})

const Article = mongoose.model("Article",articleSchema)//wasta fil js bich nzid article,nahi article,modifier 
module.exports =Article;