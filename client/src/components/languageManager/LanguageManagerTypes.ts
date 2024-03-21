import { User } from "../../types/User";
interface LanguageManagerProps {
  user: User | null;
}
export type LanguageManagerComponent = React.FC<LanguageManagerProps>;
