import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb.js'
import { BOARD_TYPES } from '~/utils/constants'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import { columnModel } from './columnModel'
import { cardModel } from './cardModel'

//* Define collection(name & schema) for boards

const BOARD_COLLECTION_NAME = 'boards'
const BOARD_COLLECTION_SCHEME = Joi.object({
  title: Joi.string().required().min(3).max(50).trim().required(),
  slug: Joi.string().required().min(3).trim().required(),
  description: Joi.string().required().min(3).max(500).trim().strict(),

  type: Joi.string().required().valid(BOARD_TYPES.PRIVATE, BOARD_TYPES.PUBLIC),

  //* Mảng lưu trữ thứ tự các column trong board
  columnOrderIds: Joi.array()
    .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
    .default([]),

  createdAt: Joi.date().timestamp('javascript').default(Date.now()),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const validateBeforeCreate = async (data) => {
  return await BOARD_COLLECTION_SCHEME.validateAsync(data, {
    abortEarly: false
  })
}

const createNew = async (data) => {
  try {
    // const createdBoard = await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(data)
    // return createdBoard
    const validData = await validateBeforeCreate(data)

    return await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(validData)
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    // console.log('id: ', id)
    return await GET_DB()
      .collection(BOARD_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) })
  } catch (error) {
    throw new Error(error)
  }
}

const getDetails = async (id) => {
  try {
    // console.log('id: ', id)
    // return await GET_DB()
    //   .collection(BOARD_COLLECTION_NAME)
    //   .findOne({ _id: new ObjectId(id) })
    const result = await GET_DB()
      .collection(BOARD_COLLECTION_NAME)
      .aggregate([
        { $match: { _id: new ObjectId(id), _destroy: false } },
        {
          $lookup: {
            from: columnModel.COLUMN_COLLECTION_NAME,
            localField: '_id',
            foreignField: 'boardId',
            as: 'columns'
          }
        },
        {
          $lookup: {
            from: cardModel.CARD_COLLECTION_NAME,
            localField: '_id',
            foreignField: 'boardId',
            as: 'cards'
          }
        }
      ])
      .toArray()
    return result[0] || {}
  } catch (error) {
    throw new Error(error)
  }
}

export const boardModel = {
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEME,
  createNew,
  findOneById,
  getDetails
}

