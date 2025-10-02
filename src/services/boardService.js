/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/slugify.js'

const createNew = async (reqBody) => {
  try {
    //* Xử lý dữ liệu tùy đặc thù dự án
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    //* Gọi tới tầng Model để tương tác DB

    //*làm thêm các bước nghiệp vụ khác (nếu có)
    //? bắn email, sms, gọi api bên thứ 3... khi board được tạo


    //! Trả về kết quả, trong service luôn trả về dữ liệu đã qua xử lý nghiệp vụ
    return newBoard
  } catch (error) {
    throw error
  }
}

export const boardService = { createNew }
