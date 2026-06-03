export interface User {
  tasks: any[];         // replace `any` with proper type if you have
  blogs: any[];         // same here
  _id: string;
  fullname: string;
  email: string;
  skill: any[];         // can define Skill interface if needed
  achievement: any[];   // can define Achievement interface
  project: any[];       // can define Project interface
  __v: number;
}

// Interface for the full response
export interface UserResponse {
  message: string;
  user: User;
}

export interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
