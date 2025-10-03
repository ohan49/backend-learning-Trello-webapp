import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService.js'
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
    const createdBoard = await boardService.createNew(req.body)

    // throw new ApiError(StatusCodes.BAD_GATEWAY, 'Anhhao test error handling')
    //* Trả về phản hồi cho client
    res.status(StatusCodes.CREATED).json(createdBoard)
  } catch (error) {
    next(error) //* Gọi tới middleware xử lý lỗi tập trung
  }
}

const getDetails = async (req, res, next) => {
  try {
    // console.log('req.params: ', req.params) //? /:id/:slug
    const boardId = req.params.id
    const board = await boardService.getDetails(boardId)
    res.status(StatusCodes.OK).json(board)
  } catch (error) {
    next(error) //* Gọi tới middleware xử lý lỗi tập trung
  }
}

export const boardController = {
  createNew,
  getDetails
}
