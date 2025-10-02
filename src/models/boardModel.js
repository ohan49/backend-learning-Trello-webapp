import Joi from 'joi'

//* Define collection(name & schema) for boards

const BOARD_COLLECTION_NAME = 'boards'
const BOARD_COLLECTION_SCHEME = Joi.object({
  title: Joi.string().required().min(3).max(50).trim().required(),
  slug: Joi.string().required().min(3).trim().required(),
  description: Joi.string().required().min(3).max(500).trim().strict(),

  columnOrderIds: Joi.array().items(Joi.string()).default([]),

  createdAt: Joi.date().timestamp('javascript').default(Date.now()),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

export const boardModel = { BOARD_COLLECTION_NAME, BOARD_COLLECTION_SCHEME }
