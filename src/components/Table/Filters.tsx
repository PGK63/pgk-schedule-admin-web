import { FC, ChangeEvent } from "react";
import {
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import SearchIcon from "./icons/SearchIcon";

export interface Filter {
  id: string;
  value: string;
}

interface FiltersProps {
  columnFilters: Filter[];
  setColumnFilters: (filters: Filter[]) => void;
}

const Filters: FC<FiltersProps> = ({ columnFilters, setColumnFilters }) => {
  const taskName = columnFilters.find((f) => f.id === "task")?.value || "";

  const onFilterChange = (id: string, value: string) => {
    const newFilters: Filter[] = columnFilters
      .filter((f) => f.id !== id)
      .concat({
        id,
        value,
      });
    setColumnFilters(newFilters);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onFilterChange("task", value);
  };

  return (
    <HStack mb={6} spacing={3}>
      <InputGroup size="sm" maxW="12rem">
        <InputLeftElement pointerEvents="none">
          <Icon as={SearchIcon} />
        </InputLeftElement>
        <Input
          type="text"
          variant="filled"
          placeholder="Task name"
          borderRadius={5}
          value={taskName}
          onChange={handleInputChange}
        />
      </InputGroup>
    </HStack>
  );
};

export default Filters;
