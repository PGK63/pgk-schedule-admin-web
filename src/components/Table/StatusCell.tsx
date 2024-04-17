import { FC, useContext, useState } from "react";
import { Box, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { STATUSES } from "../../data";
import { Context } from '../../';

interface Status {
  id: number;
  name: string;
  color: string;
}

interface ColorIconProps {
  color: string;
  mr?: number;
}

export const ColorIcon: FC<ColorIconProps> = ({ color, ...props }) => (
  <Box w="12px" h="12px" bg={color} borderRadius="3px" {...props} />
);

export interface StatusCellProps {
  getValue: () => Status | undefined;
  row: { index: number };
  column: { id: string };
  table: { options: { meta: { updateData: (rowIndex: number, columnId: string, value: Status | null) => void } } };
}


const StatusCell: FC<StatusCellProps> = ({ getValue, row, column, table }) => {
  const {store} = useContext(Context)
  const { name, color } = getValue() || {};
  const { updateData } = table.options.meta;

  const handleStatusUpdate = (status: Status | null) => {
    updateData(row.index, column.id, status);
  };

  return (
    <Menu isLazy offset={[0, 0]} flip={false} autoSelect={false}>
      <MenuButton
        h="100%"
        w="100%"
        textAlign="left"
        p={1.5}
        bg={color || "transparent"}
        color="gray.900"
      >
        {name}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => handleStatusUpdate(null)}>
          <ColorIcon color="red.400" mr={3} />
          None
        </MenuItem>
        {STATUSES.map((status: Status) => (
          <MenuItem
            onClick={() => handleStatusUpdate(status)}
            key={status.id}
          >
            <ColorIcon color={status.color} mr={3} />
            {status.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default StatusCell;
