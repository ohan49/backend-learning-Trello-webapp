import express from 'express'
import { StatusCodes } from 'http-status-codes'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'GET: API get list board' })
  })
  .post((req, res) => {
    res
      .status(StatusCodes.CREATED)
      .json({ message: 'POST: Create a new board' })
  })

export const boardRoutes = Router
