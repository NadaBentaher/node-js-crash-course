const express=require("express");//bich njib maketba lezem nesta3mel require
const mongoose=require("mongoose");
const app=express(); //inche2 el web server w nesta3mlou bich nlabiw ay request/talab

const Article =require("./models/Article");
mongoose.connect("mongodb+srv://Nada2207:Root2207.@cluster0.iaihv3h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("conneced succefully");
}).catch((error)=> {
    console.log("error with connectin with the DB",error);
})

app.use(express.json());



app.get("/hello",(req,res) => {  // /hello howa il path (,)=> : function with parameters req,res
    res.send("hello")  //en cas le client hawel yzour le site fi rabet /hello wa9etha send him hello as a response  
});
app.get("/",(req,res) => { 
    res.send("hello in node js project"); 
});

//ki nektbou  localhost:3000/hello  yraj3elna hello fil page web
app.get("/numbers",(req,res)=>{
    let numbers=""
    for(let i=0;i<=100;i++)
    {
        numbers+= i+" - ";
    }
    //res.send(`the numbers are ${numbers}`);
    res.render("numbers.ejs",{
        name: "Yarob",
        numbers: numbers,

    });
});
app.get("/findSummation/:number1/:number2",(req,res)=>{ //ili ba3ed : ynajem ykoun ili yji 3ibara parametres
    const num1= req.params.number1
    const num2= req.params.number2
    console.log(req.params)
    const total =Number(num1)+Number(num2)
    res.send(`the total is ${total}`);
})
app.get("/sayHello",(req,res)=>{ //ili ba3ed : ynajem ykoun ili yji 3ibara parametres
    //console.log(req.body);
    //console.log(req.query);
    //res.send(`Hello ${req.body.name},Age is ${req.query.age}`);
    res.json({
      name: req.body.name,
      age: req.query.age,
      language: "Arabic",
    })
})
//yelzimna na3mlou fil terminal ctrl c bich nahiw listening w naawdou nrkitbou node index.js bich takhtef
//fama hal bich no9o3dou kol mara naawdou
//tektib npx nodemon index.js
app.put("/test",(req,res)=>{
    res.send("Hello world")
});

app.post("/addComment",(req,res)=>{
    res.send("post request on add comment")
});

app.delete("/testingDelete",(req,res)=>{
    res.send("visiting delete request");
});

// =====ARTICLES ENDPOINTS ======
app.post("/articles",async(req,res)=> {
    const newArticle = new Article()
    const artTitle=req.body.articleTitle
    const artBody=req.body.articleBody
    
    newArticle.title=artTitle;
    newArticle.body=artBody;
    newArticle.numberOfLikes=0;
    await newArticle.save();
    res.json(newArticle);
});

app.get("/articles",async (req,res)=>{
    const articles=await Article.find();
    console.log("the articles are",articles);
    res.json(articles);
});
app.get("/articles/:articleId",async (req,res)=>{
    const id=req.params.articleId;
    try{
        const article = await Article.findById(id);
        res.json(article);
        return;
    }catch(error){
        console.log("error while reading article of id ",id);
        return res.send("error");
    }
   
});

app.delete("/articles/:articleId", async(req, res) => {
    const id = req.params.articleId;
    try {
        const article = await Article.findByIdAndDelete(id); // Utilisez "findByIdAndDelete" avec "id" en minuscules
        if (!article) {
            console.log("Article not found for id:", id);
            return res.status(404).json({ error: "Article not found" });
        }
        res.json(article);
    } catch (error) {
        console.log("Error while deleting article of id ", id, error);
        return res.status(500).send("Internal Server Error");
    }
});
app.get("/showArticles", async (req, res) => {
    try {
        const articles = await Article.find(); // Attendre la résolution de la promesse
        res.render("articles.ejs", {
            allArticles: articles
        });
    } catch (error) {
        console.log("Error while fetching articles", error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(3000, ()=>{ //1er para howa il port 2eme para function: listen na3mloha mara
    console.log("I am listening in port 3000"); //nahna ki ktebna fil terminal node index.js 3ibara khalina client w server nafsou(nafes el computer)
});

