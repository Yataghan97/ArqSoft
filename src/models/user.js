import mongoose from 'mongoose'; 

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, 'O nome deve ter pelo menos 3 caracteres'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

// Verifica se o modelo já foi compilado antes de criar
const user = mongoose.models.user || mongoose.model("user", userSchema);

export default user;




/** exemplo de json
{
  "name": "João Silva",
  "email": "joao.silva@email.com",
  "password": "minhaSenha123",
  "confirmpassword": "minhaSenha123"
} 

*/