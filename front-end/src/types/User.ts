export interface UserInterface {
  id: string;
  name: string;
  email: string;
  cep: string;
}

export type UserContextType = {
  user: UserInterface | null;
  setUser: React.Dispatch<React.SetStateAction<null>>;
};
