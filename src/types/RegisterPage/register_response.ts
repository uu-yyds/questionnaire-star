export interface RegisterInfo {
  username: string;
  password: string;
  nickname: string;
}

export interface RegisterResponse {
  createdAt: string;
  username: string;
  nickname: string;
  password: string;
  _id: string;
  __v: number;
  updatedAt: string;
}
