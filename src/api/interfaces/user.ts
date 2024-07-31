export interface User {
  id?: string
  name: string
  avatar?: string
  gender?: number
  desc?: string
  address?: string
  follower?: number
  follow?: number
  thumbs?: number
}
export interface UserDetail {
  id: string
  name: string
  avatar: string
  identity?: UserIdentity
  createTime: string
}
export interface UserIdentity {
  id: string
  name: string
  type: string
}
