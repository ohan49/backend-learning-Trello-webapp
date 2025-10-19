import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoute } from './boardRoute.js'
import { columnRoute } from './columnRoute.js'
import { cardRoute } from './cardRoute.js'

const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'API v1 is running' })
})

//* API board
Router.use('/boards', boardRoute)

//* Column board
Router.use('/columns', columnRoute)

//* Card board
Router.use('/cards', cardRoute)

export const APIs_V1 = Router
