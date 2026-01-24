import { createContext, Dispatch } from "react";
import User from "./types/User";

export interface UserContextType {
  user: User | null;
  setUser: Dispatch<React.SetStateAction<User | null>>;
}
export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});


