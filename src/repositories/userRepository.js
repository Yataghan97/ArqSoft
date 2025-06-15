
import User from "../models/user.js";

class UserRepository {
  static async findById(id) {
    return await User.findById(id, "-password");
  }
}

export default UserRepository;
