import express from "express";
import connectToDatabase from "./config/dbConnect.js";
import post from "./models/Post.js"
import routes from "./routers/index.js";

const connection = await connectToDatabase();

connection.on("error", (error) => {
    console.error("erro de conexao", error);
});

connection.once("open", () => {
    console.log("conexao com sucesso")
});


const app = express();
routes(app);


//app.get("/", (req, res) =>{
//   res.status(200).send("API teste");
//});

//Get all posts
//app.get("/posts", async (req, res) =>{
//    try {
//    const listPosts = await post.find({});
//    res.status(200).json(listPosts);
//    } catch (error) {
//        res.status(500).send(error.message);
//    }
//});

//New post
app.post("/posts", async (req, res) =>{
    try{
        const newPost = new post(req.body);
        await newPost.save();
        res.status(201).json({
            message: "Post criado com sucesso!",
            post: newPost,
        })
    }catch (error){
        res.status(500).send(error.message);
    }
});

//New id
app.get("/posts/:id", async (req, res) =>{
    try{
        const postId = await post.findById(req.params.id);
        if(!postId){
            return res.status(404).send("Post nao encontrado!");
        }
        res.status(200).json(postId);
    }catch (error){
        res.status(500).send(error.message);
    }
});

app.delete("/posts/:id", async (req, res) =>{
    try{
        const deletePost = await post.findByIdAndDelete(req.params.id);
        if (!deletePost){
            return res.status(404).send("Post nao encontrado");
        }
        res.status(200).send("Removido com sucesso");    

    }catch (error) {
        res.status(500).send(error.message);
}});

//New put
app.put("/posts/:id", async (req, res) =>{
    try{
        const updatePost = await post.findByIdAndUpdate(req.params.id, req.body, {new: true,
        });
            if (!updatePost){
                return res.status(404).send("Post nao encontrado")
            }
        res.status(200).json(updatePost);
    }catch{
        res.status(200).send(error.message);
    }
    
});


//app.post("/posts", (req, res) =>{
//    posts.push(req.body);
//    res.status(201).send("Post criado com sucesso");
//});

//app.get("/posts/:id", (req, res) =>{
//    const index = searchPost(req.params.id);
//    res.status(200).json(posts[index]);
//});

//app.put("/posts/:id", (req, res) =>{
//    const index = searchPost(req.params.id);
//    posts[index].title = req.body.title;
//    posts[index].description = req.body.description;
//    posts[index].author = req.body.author;
//    res.status(200).json(posts[index]);
//});

//app.delete("/posts/:id", (req, res) =>{
//    const index = searchPost(req.params.id);
//    posts.splice(index, 1);
//    res.status(200).send("Removido com sucesso");
//});

export default app;