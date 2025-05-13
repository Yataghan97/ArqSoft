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
});
const user = mongoose.model("user", userSchema);

export default user;
