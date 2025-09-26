/* eslint-disable no-console */

import express from 'express'
import { CONNECT_DB, CLOSE_DB } from './config/mongodb.js'
// import { mapOrder } from '~/utils/sorts.js'
import exitHook from 'async-exit-hook'
import { env } from './config/environment.js'
import { APIs_V1 } from './routes/v1'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware.js'

const START_SERVER = () => {
  const app = express()

  //enable req.body data
  app.use(express.json())

  app.use('/v1', APIs_V1)

  //middleware xử lý lỗi tập trung
  app.use(errorHandlingMiddleware)

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(
      `3. Hello ${env.AUTHOR}, I am running at ${env.APP_HOST}:${env.APP_PORT}/`
    )
  })

  exitHook(() => {
    console.log('4. Server is exiting, closing MongoDB connection...')
    return CLOSE_DB()
  })
}

//* Kết nối đến MongoDB thành công  sau đó khởi động server
;(async () => {
  try {
    console.log('1. connecting to MongoDB...')
    await CONNECT_DB()
    console.log('2. Connected to MongoDB successfully!')

    START_SERVER()
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    process.exit(0) //! Exit the process with a failure code
  }
})()

// //* In console log thông báo đang kết nối đến MongoDB
// console.log('1. connecting to MongoDB...')

// //* Kết nối đến MongoDB thành công  sau đó khởi động server
// CONNECT_DB()
//   .then(() => console.log('2. Connected to MongoDB successfully!'))
//   .then(() => {
//     START_SERVER()
//   })
//   .catch((error) => {
//     console.error('Error connecting to MongoDB:', error)
//     process.exit(0) //! Exit the process with a failure code
//   })
