/* eslint-disable no-console */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from 'express'
import { CONNECT_DB, GET_DB, CLOSE_DB } from '~/config/mongodb.js'
import { mapOrder } from '~/utils/sorts.js'
import exitHook from 'async-exit-hook'

const START_SERVER = () => {
  const app = express()

  const hostname = 'localhost'
  const port = 8017

  app.get('/', async (req, res) => {
    // Test Absolute import mapOrder
    console.log(await GET_DB().listCollections().toArray())
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(
      `3. Hello Nguyen Dinh Anh Hao, I am running at ${hostname}:${port}/`
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
