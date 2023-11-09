import UserTypes from '../../constants/UserTypes';

export type IUser = {
  id: number,
  sub: string,
  email: string,
  name: string,
  type: UserTypes,
}