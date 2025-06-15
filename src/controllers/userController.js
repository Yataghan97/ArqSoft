import UserService from "../services/userService.js";

class userController {
  static getUser = async (req, res) => {
    try {
      const user = await UserService.getUserById(req.params.id);
      res.status(200).json({ user });
    } catch (error) {
      res.status(404).json({ msg: error.message });
    }
  };
}

export default userController;
