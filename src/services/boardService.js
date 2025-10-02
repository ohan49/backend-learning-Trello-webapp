/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formatters.js'
import { boardModel } from '~/models/boardModel.js'

const createNew = async (reqBody) => {
  try {
    //* Xử lý dữ liệu tùy đặc thù dự án
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    //* Gọi tới tầng Model để tương tác DB
    const createdBoard = await boardModel.createNew(newBoard)
    console.log('createdBoard: ', createdBoard)

    //* Lấy bản ghi vừa tạo
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)
    console.log('getNewBoard: ', getNewBoard)

    //*làm thêm các bước nghiệp vụ khác (nếu có)
    //? bắn email, sms, gọi api bên thứ 3... khi board được tạo

    //! Trả về kết quả, trong service luôn trả về dữ liệu đã qua xử lý nghiệp vụ
    return getNewBoard
  } catch (error) {
    throw error
  }
}

export const boardService = { createNew }
