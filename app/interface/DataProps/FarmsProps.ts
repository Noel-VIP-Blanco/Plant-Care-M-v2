interface Owner {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
  password: null | string;
  accountNonLocked: boolean;
}

export interface FarmProps {
  id: number;
  name: string;
  location: string;
  owner: Owner;
  mainArduinoBoardId: number;
}
