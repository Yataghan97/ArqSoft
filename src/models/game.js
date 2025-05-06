import mongoose from "mongoose";


const gameSchema = new mongoose.Schema({
    //id: {type: mongoose.Schema.Types.ObjectId},

    nome: {type: String, 
        require: [true, "O título é obrigatório"],
        trim: true    
    },

    nota: {type: Number,
        min: [0, "A nota mínima é 0"],
        max: [100, "A nota máxima é 100"],
            validate: {
                validator: Number.isInteger,
                message: "A nota deve ser um número inteiro"
        }
    },
    
    genero: {type: String,
        require: [true, "Deve ser inserido o genero do jogo"],
        trim: true
    },

    dataCriacao: {type: Date},


    v: {type: Boolean,
        default: false
    },

    favoritos: {
        type: [String],
        default: []
    }
    
    //v: {type: Number,
    //    validate: {
    //        validator: Number.isInteger
    //}

    },


{
    versionKey: false, 
    timestamps: true, 
});

const game = mongoose.model("apis", gameSchema);

export default game;
