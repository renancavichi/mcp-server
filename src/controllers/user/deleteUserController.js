import * as User from '../../models/userModel.js'

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    await User.remove(id)
    
    res.status(200).json({
      success: true,
      message: 'Usuário excluído com sucesso'
    })
  } catch (error) {
    if (error.message === 'Erro de validação') {
      return res.status(400).json({
        success: false,
        message: 'ID inválido',
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