import { Spinner } from './../../../components';
import React from 'react';
import { useTable, useSortBy } from 'react-table';
import { useFetchAllOrdersQuery } from './../../../redux/features/admin/orders-api-slice';
/* eslint-disable-next-line */
export interface OrdenesProps {}

function Table({ columns, data }) {
  console.log(data);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  // We don't want to render all 2000 rows for this example, so cap
  // it at 20 for this use case
  const firstPageRows = rows.slice(0, 20);

  return (
    <>
      <table
        {...getTableProps()}
        className="w-full text-left text-sm text-black"
      >
        <thead className="bg-apricot text-xs uppercase text-white">
          {headerGroups.map((headerGroup, i) => (
            <tr
              className="border-apricot-light border-b"
              key={i}
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column, i) => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th
                  className="py-3 px-6"
                  key={i}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                className="border-black-light/10 odd:bg-black-light/20 border-b"
                key={i}
                {...row.getRowProps()}
              >
                {row.cells.map((cell, i) => {
                  return (
                    <td
                      className="whitespace-nowrap py-4 px-6 font-medium text-black"
                      key={i}
                      {...cell.getCellProps()}
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export function Ordenes(props: OrdenesProps) {
  const { isLoading, data } = useFetchAllOrdersQuery();
  const today = new Date();
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'Nombre',
            accessor: 'client.name',
          },
        ],
      },
      {
        Header: 'Información de orden',
        columns: [
          {
            Header: 'Tienda',
            accessor: 'store',
          },
          {
            Header: 'Costo',
            accessor: (row) => `$${row.cost}`,
          },
          {
            Header: 'Abonado',
            accessor: (row) => `$${row.payment ?? '00.00'}`,
          },
          {
            Header: 'Status',
            accessor: 'status',
          },
          {
            Header: 'Domicilio',
            accessor: 'address',
          },
          {
            Header: 'Fecha de pedido',
            accessor: (row) => today.toLocaleDateString('en-US', row.updatedAt),
          },
        ],
      },
    ],
    []
  );

  return (
    <>
      {isLoading && <Spinner />}
      <div className="relative min-h-[calc(100vh-2rem)] overflow-x-auto rounded bg-white">
        {data && <Table columns={columns} data={data} />}
      </div>
    </>
  );
}

export default Ordenes;
