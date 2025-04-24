import * as User from '../../models/userModel.js'

export const createUser = async (req, res) => {
  try {
    const user = req.body
    const newUser = await User.create(user)
    res.status(201).json({
      success: true,
      message: 'Usuário criado com sucesso',
      data: newUser
    })
  } catch (error) {
    if (error.message === 'Erro de validação') {
      return res.status(400).json({
        success: false,
        message: error.message,
        errors: error.errors
      })
    }
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}