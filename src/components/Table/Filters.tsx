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
  value: string;
  onValueChange: (filters: string) => void;
}

const Filters: FC<FiltersProps> = ({ value, onValueChange}) => {

  return (
    <HStack mb={6} spacing={3}>
      <InputGroup size="sm" maxW="12rem">
        <InputLeftElement pointerEvents="none">
          <Icon as={SearchIcon} />
        </InputLeftElement>
        <Input
          type="text"
          variant="filled"
          placeholder="Поиск..."
          borderRadius={5}
          value={value}
          onChange={(v) =>  onValueChange(v.target.value)}
        />
      </InputGroup>
    </HStack>
  );
};

export default Filters;
