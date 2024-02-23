type UserData = {
  username: string;
  isAdmin: boolean;
};

export interface ProtectedRouteProps {
  // user: UserData | null;
  children: React.ReactNode;
  fromLoginOrRegister?: boolean;
  isAdminRoute?: boolean;
}

export type ProtectedRouteComponent = React.FC<ProtectedRouteProps>;
