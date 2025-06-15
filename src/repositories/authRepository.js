import User from "../models/User.js";

class AuthRepository {
  static async findByEmail(email) {
    return await User.findOne({ email });
  }

  static async create(data) {
    const user = new User(data);
    return await user.save();
  }

  static async saveResetToken(userId, token, expiration) {
    return await User.findByIdAndUpdate(userId, {
      resetPasswordToken: token,
      resetPasswordExpires: expiration,
    });
  }
}

export default AuthRepository;
