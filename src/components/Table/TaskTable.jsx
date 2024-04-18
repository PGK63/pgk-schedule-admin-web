import React, { useState, useEffect, useContext } from "react";
import { Box, Button, ButtonGroup, Icon, Text } from "@chakra-ui/react";
import { Context } from '../../';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import EditableCell from "./EditableCell";
import StatusCell from "./StatusCell";
import Filters from "./Filters";
import SortIcon from "./icons/SortIcon";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  }, [pageIndex]);

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

  const deleteRow = (rowIndex, id, isAdd) => {
    if(isAdd) {
      const newData = [...data];
      newData.splice(rowIndex, 1);
      setData(newData);
    }else {
      store.deleteById(id).then(() => {
        const newData = [...data];
        newData.splice(rowIndex, 1);
        setData(newData);
        toast.success("Success")
      }).catch(err => {
        toast.error("Failed")
      })
    }
  };

  const saveRow = (rowIndex, row) => {
    if (!row.firstName && !row.lastName && !row.departments.length) {
      toast.warning("Validation error")
      return
    }

    const newRow = {
      firstName: row.firstName,
      lastName: row.lastName,
      middleName: row.middleName?.length ? row.middleName : undefined,
      cabinet: row.cabinet?.length ? row.cabinet : undefined,
      departmentIds: row.departments.map(dep => dep.id),
    };

    console.log(newRow)

    if(row.isAdd === true) {
      store.add(newRow).then(() => {
        const newData = [...data];
        row["isAdd"] = false
        newData[rowIndex] = row;
        setData(newData);

        toast.success("Success")
      }).catch((err) => {
        console.log(err)
        toast.error("Failed")
      })
    }else if(row.isUpdate === true) {
      store.update(row.id, newRow).then((d) => {
        console.log(d)
        const newData = [...data];
        row["isUpdate"] = false
        newData[rowIndex] = row;
        setData(newData);

        toast.success("Success")
      }).catch((err) => {
        console.log(err)
        toast.error("Failed")
      })
    }
  }

  const addRow = () => {
    setData([...data, {
      departments: [],
      isAdd: true
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
                  isUpdate: !row.isAdd
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
                {(row.original.isAdd) &&
                    <Box w="100px" padding="5px">
                      <Button onClick={() => {
                        deleteRow(rowIndex, null, true)
                      }}>Удалить</Button>
                    </Box>
                }

                {(row.original.isUpdate || row.original.isAdd) &&
                    <Box w="100px" padding="5px">

                      <Button onClick={() => {
                        saveRow(rowIndex, row.original)
                      }}>Сохранить</Button>

                    </Box>
                }
              </Box>
          ))}
        </Box>
        <br/>
        <Button onClick={addRow} marginBottom="15px">Add Row</Button>
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
        <ToastContainer position="bottom-right" theme="colored"/>
      </Box>
  );
};

export default TaskTable;
