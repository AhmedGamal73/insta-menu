export type User = {
  _id?: string;
  name: string;
  username: string;
  password: string;
  confirmPassword?: string;
  role: string;
  age: number;
  phone: string;
  address?: string;
  section?: {
    id: string;
    name: string;
  };
  tables?: {
    id: string;
    number: number;
  }[];
  orders?: string[];
};
