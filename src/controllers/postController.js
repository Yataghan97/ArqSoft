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
        }
    };
}

    

export default PostController;