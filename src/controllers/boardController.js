import { StatusCodes } from 'http-status-codes'
// import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  try {
    // console.log('req.body: ', req.body)
    // console.log('req.query: ', req.query) //? ?key=value&key=value
    // console.log('req.params: ', req.params) //? /:id/:slug
    // console.log('req.files: ', req.files)
    // console.log('req.cookies: ', req.cookies)
    // console.log('req.jwtDecoded: ', req.jwtDecoded)

    //* điều hướng đến service để xử lý nghiệp vụ

    // throw new ApiError(StatusCodes.BAD_GATEWAY, 'Anhhao test error handling')
    //* Trả về phản hồi cho client
    res
      .status(StatusCodes.CREATED)
      .json({ message: 'Post from controller: API create new board' })
  } catch (error) {
    next(error) //* Gọi tới middleware xử lý lỗi tập trung
  }
}

export const boardController = {
  createNew
}
