export interface IUser {
    id: number;
    username: string;
    email: string;
    password: string;
  }

function isEqual(u: IUser, s: IUser): boolean{
  return u.email == s.email && u.id == s.id && u.password == s.password && u.username == s.username;
}

export default{
  isEqual
}