import * as User from '../../models/userModel.js'

export const getUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      })
    }
    
    res.status(200).json({
      success: true,
      data: user
    })
  } catch (error) {
    if (error.message === 'Erro de validação') {
      return res.status(400).json({
        success: false,
        message: 'ID inválido',
        errors: error.errors
      })
    }
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}