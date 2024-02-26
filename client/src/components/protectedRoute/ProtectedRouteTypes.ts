export interface ProtectedRouteProps {
  children: React.ReactNode;
  fromLoginOrRegister?: boolean;
  isAdminRoute?: boolean;
}

export type ProtectedRouteComponent = React.FC<ProtectedRouteProps>;
