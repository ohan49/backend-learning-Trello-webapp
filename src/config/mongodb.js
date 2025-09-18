import { env } from '../env/index.js'

import { MongoClient, ServerApiVersion } from 'mongodb'

//* Khởi tạo một đối tượng TrelloDatabaseInstance ban đầu là null
let trelloDatabaseInstance = null

//* Khởi tạo một đối tượng MongoClientInstance với URL kết nối MongoDB
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  //? Lưu ý: serverApi có từ phiên bản 5.0.0 trở lên có thể không cần dùng nó, nếu dùng là chúng ta chỉ định một cái stable API version của MongoDB
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

//* Hàm kết nối đến cơ sở dữ liệu MongoDB
export const CONNECT_DB = async () => {
  //* gọi kết nối đến MongoDB
  await mongoClientInstance.connect()

  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}

//* function GET_DB (Không async/await) có nhiệm vụ export ra cái Trello Database Instance sau khi đã connect thành công đến MongoDB để chúng ta sử dụng ở nhiều nơi khác nhau trong code.
//* Lưu ý phải đảm bảo chỉ dùng gọi cái GET_DB này sau khi đã kết nối thành công tới MongoDB
export const GET_DB = () => {
  //* Kiểm tra xem trelloDatabaseInstance đã được khởi tạo chưa
  if (!trelloDatabaseInstance)
    throw new Error('Trello database instance is not initialized')

  //* Trả về đối tượng trelloDatabaseInstance
  return trelloDatabaseInstance
}
