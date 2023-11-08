import { createContext } from "react";

export interface User {
  isAdmin: boolean;
  email: string;
}

export interface IAuthContext {
  user: User | null;
  setUser: (user: User | null) => void;
}

export default createContext<IAuthContext>({
  user: null,
  setUser: () => {}
});
