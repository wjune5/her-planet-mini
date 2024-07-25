import { User } from "./user"
export interface Msg {
  id: string
  content: string
  unread?: number
  createUser: User
  createTime: Date
}
export interface MsgDetail {
  id: string
  content: string
  createUser: User
  createTime: Date
}