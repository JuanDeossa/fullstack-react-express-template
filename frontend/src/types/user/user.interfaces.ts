export interface CreateUser {
  email: string;
  password: string;
  name: string;
}

export interface UserResponse {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
}
