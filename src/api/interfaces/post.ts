import { User } from "./user"

export interface Post {
  id: string
  title: string
  content:string
  imgs?: string
  createUser: User

}
export interface PostDetail {
  id: string
  title: string
  content:string
  imgs?: string[]
  createUser: User
  tags: string[],
  address: string,
  businessTime:string
}
export interface Property {
  id: string
  name: string
  value:string
  type?: string
}
export interface Comment {
  id: string
  content:string
  createUser: User
  replies: Array<Comment>
  replyCount: Number
  createTime: string
  isTop: Boolean
} 
interface Extra {
  icon?:string
  dots?: number
}
export interface Area {
  id: string
  name: string
  extra?:Extra

}