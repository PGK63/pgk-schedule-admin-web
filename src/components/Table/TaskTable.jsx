import React, { useState, useEffect, useContext } from "react";
import { Box, Button, ButtonGroup, Icon, Text } from "@chakra-ui/react";
import { Context } from '../../';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import EditableCell from "./EditableCell";
import StatusCell from "./StatusCell";
import Filters from "./Filters";
import SortIcon from "./icons/SortIcon";

const columns = [
  {
    accessorKey: "lastName",
    header: "Фамилия",
    size: 225,
    cell: EditableCell,
    enableColumnFilter: true,
    filterFn: "includesString",
  },
  {
    accessorKey: "firstName",
    header: "Имя",
    size: 225,
    cell: EditableCell,
    enableColumnFilter: true,
    filterFn: "includesString",
  },
  {
    accessorKey: "middleName",
    header: "Отчество",
    size: 225,
    cell: EditableCell,
    enableColumnFilter: true,
    filterFn: "includesString",
  },
  {
    accessorKey: "cabinet",
    header: "Кабинет",
    size: 225,
    cell: EditableCell,
    enableColumnFilter: true,
    filterFn: "includesString",
  },
  {
    accessorKey: "departments",
    header: "Отделения",
    cell: StatusCell,
    enableSorting: false,
    enableColumnFilter: true,
    filterFn: (row, columnId, filterStatuses) => {
      if (filterStatuses.length === 0) return true;
      const status = row.getValue(columnId);
      return filterStatuses.includes(status?.id);
    },
  },
];

const TaskTable = ({ items }) => {
  const { store } = useContext(Context);
  const [data, setData] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetchData(search)
  }, [search])

  useEffect(() => {
    if (!isMounted && items.length > 0) { 
      setData(extractContent(items));
      setIsMounted(true); 
    } else {
      fetchData();
    }
  }, [items, isMounted, pageIndex]);
  
  const fetchData = (name = "") => {
    try {
      store.getTeacherData(pageIndex, name)
        .then(pageItems => {
          setData(extractContent(pageItems));
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const nextPage = () => {
    if (pageIndex + 1 < items[0]?.totalPage) {
      setPageIndex(pageIndex + 1);
    }
  };
  
  const previousPage = () => {
    if (pageIndex - 1 >= 0) {
      setPageIndex(pageIndex - 1);
    }
  };
    
  const extractContent = (array) => {
    return (Array.isArray(array) && array.length > 0 && Array.isArray(array[0].content)) ? array[0].content : []
  }

  const deleteRow = (rowIndex, id) => {
    store.deleteById(id).then(() => {
      const newData = [...data];
      newData.splice(rowIndex, 1);
      setData(newData);
    }).catch(e => console.log(e.data))
  };

  const addRow = () => {
    setData([...data, {
      departments: []
    }]);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: "onChange",
    meta: {
      updateData: (rowIndex, columnId, value) =>
        setData((prev) =>
          prev.map((row, index) =>
            index === rowIndex
              ? {
                  ...prev[rowIndex],
                  [columnId]: value,
                }
              : row
          )
        ),
    },
  });

  return (
    <Box>
      <Filters
        value={search}
        onValueChange={setSearch}
      />
      <Box className="table" w={table.getTotalSize()}>
        {table.getHeaderGroups().map((headerGroup) => (
          <Box className="tr" key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Box className="th" w={header.getSize()} key={header.id}>
                {header.column.columnDef.header}
                {header.column.getCanSort() && (
                  <Icon
                    as={SortIcon}
                    mx={3}
                    fontSize={14}
                    onClick={header.column.getToggleSortingHandler()}
                  />
                )}
                {
                  {
                    asc: " 🔼",
                    desc: " 🔽",
                  }[header.column.getIsSorted()]
                }
                <Box
                  onMouseDown={header.getResizeHandler()}
                  onTouchStart={header.getResizeHandler()}
                  className={`resizer ${
                    header.column.getIsResizing() ? "isResizing" : ""
                  }`}
                />
              </Box>
            ))}
          </Box>
        ))}
        {table.getRowModel().rows.map((row, rowIndex) => (
          <Box className="tr" key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Box className="td" w={cell.column.getSize()} key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Box>
            ))}
            <Box w="100px">
              <Box
                pos="absolute"
                cursor="pointer"
                fontSize="30"
                color="red.300"
                onClick={() => {
                  deleteRow(rowIndex, row.original.id);
                }}
              >
                &times;
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      <br />
      <Button onClick={addRow}>Add Row</Button>
      <Text mb={2}>
        Page {pageIndex + 1} of {items[0]?.totalPage || 1}
      </Text>
      <ButtonGroup size="sm" isAttached variant="outline">
        <Button
          onClick={previousPage}
          isDisabled={pageIndex === 0}
        >
          {"<"}
        </Button>
        <Button
          onClick={nextPage}
          isDisabled={pageIndex === items[0]?.totalPage - 1}
        >
          {">"}
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default TaskTable;
