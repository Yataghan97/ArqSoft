import User from '../models/user.js';


//Private route
class userController {
 static  getUser = async(req, res) =>{
  const id = req.params.id;
  
  const user = await User.findById(id, "-password");
  if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado!" });
  }
  res.status(200).json({ user });
}}

export default userController;