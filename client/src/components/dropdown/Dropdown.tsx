import { DropdownComponent } from "./DropdownTypes";

const Dropdown: DropdownComponent = ({ options, selected, setSelected }) => {
  return (
    <select value={selected} onChange={(e) => setSelected(e.target.value)}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
