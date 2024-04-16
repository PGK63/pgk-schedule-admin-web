import { Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export interface EditableCellProps {
  getValue: () => string | undefined;
  row: { index: number };
  column: { id: string }; 
  table: { options: { meta?: { updateData: (rowIndex: number, columnId: string, value: string) => void } } };
}




const EditableCell: React.FC<EditableCellProps> = ({ getValue, row, column, table }) => {
  const initialValue = getValue() || ''; 
  const [value, setValue] = useState<string>(initialValue || '');

  const onBlur = () => {
    if (table.options.meta && table.options.meta.updateData) {
      table.options.meta.updateData(row.index, column.id.toString(), value);
    }
  };

  useEffect(() => {
    if (initialValue !== undefined) {
      setValue(initialValue);
    }
  }, [initialValue]);

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      variant="filled"
      size="sm"
      w="85%"
      overflow="hidden"
      textOverflow="ellipsis"
      whiteSpace="nowrap"
    />
  );
};

export default EditableCell;
