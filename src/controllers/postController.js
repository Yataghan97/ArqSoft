import post from "../models/Post.js";

class PostController {

    static async getAllPosts (req, res) {
            try {
            const listPosts = await post.find({});
            res.status(200).json(listPosts);
            } catch (error) {
                res.status(500).send(error.message);
            }
        };

    static async postPost (req, res) {
        try{
            const newPost = new post(req.body);
            await newPost.save();
            res.status(201).json({
                message: "Post criado com sucesso!",
                post: newPost,
            })
        }catch (error){
            res.status(500).send(error.message);
        };

    };

    static async getPost (req, res) {
        try{
            const postId = new post.findById(req.params.id);
            if(!postId){
                return res.status(404).send("Post nao encontrado!");
            }
            res.status(200).json(postId);
        }catch (error){
            res.status(500).send(error.message);
        }
    };
};

    

export default PostController;