import { useLocalStorage } from "usehooks-ts";
import AuthContext from "./AuthContext";
import { User } from "./AuthContext";

interface IAuthContextProviderProps {
  children: React.ReactNode;
}

export default function SettingsContextProvider({
  children,
}: IAuthContextProviderProps) {
  const [user, setUser] = useLocalStorage<User | null>("auth-user", {
    isAdmin: true,
    email: "jonas.vdr@gmail.com",
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
