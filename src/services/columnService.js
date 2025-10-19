import { slugify } from '~/utils/formatters.js'
import { columnModel } from '~/models/columnModel.js'
import { boardModel } from '~/models/boardModel'

const createNew = async (reqBody) => {
  try {
    const newColumn = {
      ...reqBody
    }
    const createdColumn = await columnModel.createNew(newColumn)
    const getNewColumn = await columnModel.findOneById(createdColumn.insertedId)

    if(getNewColumn) {
      //* xử lý cấu trúc dữ liệu trước khi trả về data
      getNewColumn.cards = []

      //* cập nhật lại mảng columnOrderIds trong collection boards
      await boardModel.pushColumnOrderIds(getNewColumn)
    }

    return getNewColumn
  } catch (error) {
    throw error
  }
}

export const columnService = { createNew }
