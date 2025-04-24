import * as User from '../../models/userModel.js'

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = req.body
    
    const updatedUser = await User.update(id, user)
    
    res.status(200).json({
      success: true,
      message: 'Usuário atualizado com sucesso',
      data: updatedUser
    })
  } catch (error) {
    if (error.message === 'Erro de validação') {
      return res.status(400).json({
        success: false,
        message: error.message,
        errors: error.errors
      })
    }
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      })
    }
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}