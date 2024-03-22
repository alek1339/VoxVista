export interface DropdownProps {
  options: string[];
  selected: string;
  setSelected: (selected: string) => void;
}

export type DropdownComponent = React.FC<DropdownProps>;
