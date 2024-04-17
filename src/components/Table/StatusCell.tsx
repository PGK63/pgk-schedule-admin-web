import {FC, useContext, useEffect, useState} from "react";
import { Box, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { STATUSES } from "../../data";
import { Context } from '../../';

interface Status {
  id: number;
  name: string;
  color?: string;
}

interface ColorIconProps {
  color: string;
  mr?: number;
}

export const ColorIcon: FC<ColorIconProps> = ({ color, ...props }) => (
  <Box w="12px" h="12px" bg={color} borderRadius="3px" {...props} />
);

export interface StatusCellProps {
  getValue: () => Status[];
  row: { index: number };
  column: { id: string };
  table: { options: { meta: { updateData: (rowIndex: number, columnId: string, value: Status[]) => void } } };
}

const getColorByDep = (departments: Status[]) => {
  const ids = departments.map(d => d.id);
  if(ids.includes(1) && ids.includes(2))
    return "green.300"
  else if (ids.includes(1)) {
    return "blue.300"
  }else if(ids.includes(2)) {
    return "red.300"
  }else {
    return "transparent"
  }
};

const StatusCell: FC<StatusCellProps> = ({ getValue, row, column, table }) => {
  const {store} = useContext(Context)
  const [data, setDate] = useState(getValue());
  const { updateData } = table.options.meta;

  const handleStatusUpdate = (status: Status) => {
    const indexToRemove = data.findIndex(item => item.id === status.id);

    if(indexToRemove !== -1)
      data.splice(indexToRemove, 1)
    else
      data.push(status)

    updateData(row.index, column.id, data);
  };

  return (
    <Menu isLazy offset={[0, 0]} flip={false} autoSelect={false}>
      <MenuButton
        h="100%"
        w="100%"
        textAlign="left"
        p={1.5}
        bg={getColorByDep(data)}
        color="gray.900"
      >
        {data.map(item => item.name).join(', ')}
      </MenuButton>
      <MenuList>
        {STATUSES.map((status: Status) => (
          <MenuItem
            onClick={() => handleStatusUpdate(status)}
            key={status.id}
          >
            { status.color != null &&
                <ColorIcon color={status.color} mr={3} />
            }
            {status.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default StatusCell;
