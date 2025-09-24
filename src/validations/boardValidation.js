import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'

const createMew = async (req, res, next) => {
  //! validation conditions for creating a new board very important to ensure data integrity
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().message({
      'any.required': 'title is required',
      'string.empty': 'title is not allowed to be empty',
      'string.min': 'title is not allowed to be less than {#limit} characters',
      'string.max': ' title is not allowed to be more than {#limit} characters',
      'string.trim': 'title must not have leading or trailing spaces'
    }),
    description: Joi.string().required().min(3).max(256).trim().strict()
  })

  try {

    //* using abortEarly to show all errors
    await correctCondition.validateAsync(req.body, { abortEarly: false })

    //* validation passed, go to the controller
    next()

    
  } catch (error) {
    // console.log(new Error(error))
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message
    })
  }
}

export const boardValidation = {
  createMew
}
