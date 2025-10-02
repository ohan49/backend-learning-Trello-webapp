import Joi from 'joi'
import { GET_DB } from '~/config/mongodb.js'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

//* Define collection(name & schema) for boards

const BOARD_COLLECTION_NAME = 'boards'
const BOARD_COLLECTION_SCHEME = Joi.object({
  title: Joi.string().required().min(3).max(50).trim().required(),
  slug: Joi.string().required().min(3).trim().required(),
  description: Joi.string().required().min(3).max(500).trim().strict(),

  columnOrderIds: Joi.array()
    .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
    .default([]),

  createdAt: Joi.date().timestamp('javascript').default(Date.now()),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const createNew = async (data) => {
  try {
    // const createdBoard = await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(data)
    // return createdBoard
    return await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(data)
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    console.log('id: ', id)
    const result = await GET_DB()
      .collection(BOARD_COLLECTION_NAME)
      .findOne({ _id: id })
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const boardModel = {
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEME,
  createNew,
  findOneById
}
