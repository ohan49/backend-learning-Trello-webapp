import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res) => {
  try {
    console.log('req.body: ', req.body)
    console.log('req.query: ', req.query) //? ?key=value&key=value
    console.log('req.params: ', req.params) //? /:id/:slug
    // console.log('req.files: ', req.files)
    // console.log('req.cookies: ', req.cookies)
    // console.log('req.jwtDecoded: ', req.jwtDecoded)

    //* điều hướng đến service để xử lý nghiệp vụ

    //* Trả về phản hồi cho client
    res
      .status(StatusCodes.CREATED)
      .json({ message: 'Post from controller: API create new board' })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: error.message
    })
  }
}

export const boardController = {
  createNew
}
