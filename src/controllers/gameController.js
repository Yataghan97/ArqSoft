import  game  from "../models/game.js";

class gameController {

    static async getAllgame (req, res) {
        try {
        const listGame = await game.find({});
        res.status(200).json(listGame);
        } catch (error) {
            res.status(500).send(error.message);
        }
    };

    static async postGame (req, res) {
        try{
            const newGame = new game(req.body);
            await newGame.save();
            res.status(201).json({
                message: "Autor criado com sucesso!",
                post: newGame,
            })
        }catch (error){
            res.status(500).send(error.message);
        };

    };

    static async getGame (req, res) {
        try{
            const gameId = new game.findById(req.params.id);
            if(!gameId){
                return res.status(404).send("Autor nao encontrado!");
            }
            res.status(200).json(gameId);
        }catch (error){
            res.status(500).send(error.message);
        }
    };

    static async gameDelete (req, res) {
        try{
            const deleteAuthor = await author.findByIdAndDelete(req.params.id);
            if (!deleteAuthor){
                return res.status(404).send("Post nao encontrado");
            }
            res.status(200).send("Autor removido com sucesso");    
    
        }catch (error) {
            res.status(500).send(error.message);
        }
    };

    static async updateGame(req, res) {
        try{
            const updateGame = await game.findByIdAndUpdate(req.params.id, req.body, {new: true,
            });
                if (!updateGame){
                    return res.status(404).send("Autor nao encontrado")
                }
            res.status(200).json(updateGame);
        }catch{
            res.status(200).send(error.message);
        }
        
    };
    static async findGameByKeyword(req, res) {
        try {
            const { keyword } = req.params
            const result = await game.find({
                $or:[
                    {nome: {$regex: keyword, $options: "i"} },
                    //{nota: {$regex: keyword, $options: "i"} },
                    ]    
            });
            if (result.length === 0){
                return res.status(404).json({
                    message: "Nenhum post encontrado com a palavra-chave informada"
                })
            }
            res.status(200).json(result);
        } catch (error) {
            res.status(500).send(error.message);
        }
    };

};

    

export default gameController;