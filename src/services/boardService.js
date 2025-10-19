/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formatters.js'
import { boardModel } from '~/models/boardModel.js'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'

const createNew = async (reqBody) => {
  try {
    //* Xử lý dữ liệu tùy đặc thù dự án
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    //* Gọi tới tầng Model để tương tác DB
    const createdBoard = await boardModel.createNew(newBoard)

    //* Lấy bản ghi vừa tạo
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)

    //*làm thêm các bước nghiệp vụ khác (nếu có)
    //? bắn email, sms, gọi api bên thứ 3... khi board được tạo

    //! Trả về kết quả, trong service luôn trả về dữ liệu đã qua xử lý nghiệp vụ
    return getNewBoard
  } catch (error) {
    throw error
  }
}

const getDetails = async (boardId) => {
  try {
    //* Gọi tới tầng Model để tương tác DB
    const board = await boardModel.getDetails(boardId)
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found')
    }

    //* B1: để xử lý không bị ảnh hưởng đến dữ liệu gốc, tùy mục đích về sau có thể không cần clone deep hay không.
    const resBoard = cloneDeep(board)

    //* B2: đưa card về đúng định dạng frontend cần
    resBoard.columns.forEach((column) => {
      // column.cards = resBoard.cards.filter(
      //   (card) => card.columnId.toString() === column._id.toString()
      // )
      column.cards = resBoard.cards.filter((card) =>
        card.columnId.equals(column._id)
      )
    })

    //* B3: Xoá trường cards khỏi board
    delete resBoard.cards

    //! Trả về kết quả, trong service luôn trả về dữ liệu đã qua xử lý nghiệp vụ
    return resBoard
  } catch (error) {
    throw error
  }
}

export const boardService = { createNew, getDetails }
