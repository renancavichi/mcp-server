import * as User from '../../models/userModel.js'

export const listUser = async (req, res) => {
  try {
    const users = await User.findAll()
    res.status(200).json({
      success: true,
      data: users
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}