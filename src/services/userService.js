
import UserRepository from "../repositories/userRepository.js";

class UserService {
  static async getUserById(id) {
    const user = await UserRepository.findById(id);
    if (!user) {
      throw new Error("Usuário não encontrado!");
    }
    return user;
  }
}

export default UserService;
