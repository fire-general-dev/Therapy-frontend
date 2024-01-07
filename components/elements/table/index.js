import PropTypes from "prop-types"
import React from "react"
import TableBody from "./tableBody"
import TableHeader from "./tableHeader"
import { Table } from "flowbite-react/lib/cjs/components/Table"

export const PatientsTable = (props) => {
  const { patients, header, className = "" } = props
  return (
    <div
      className={`overflow-x-auto relative rounded-lg px-vw20 bg-white ${className}`}
    >
      <table className="mainTable">
        <TableHeader titles={header} />
        {/* <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700 w-11/12" /> */}
        <TableBody items={patients} />
      </table>
      {/* <Table>
        
        <Table.Head className="text-18px text-[#2e4765] font-avenirMedium ">
          <Table.HeadCell className="tableHead">Name</Table.HeadCell>
          <Table.HeadCell className="tableHead">Email</Table.HeadCell>
          <Table.HeadCell className="tableHead">Phone</Table.HeadCell>
          <Table.HeadCell>Previous</Table.HeadCell>
          <Table.HeadCell>
            <span>Upcoming</span>
          </Table.HeadCell>
          <Table.HeadCell></Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {patients.map((pat) => (
            <Table.Row
              key={pat.key}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {pat.name}
              </Table.Cell>
              <Table.Cell>{pat.email}</Table.Cell>
              <Table.Cell>{pat.phone}</Table.Cell>
              <Table.Cell>{pat.previouse}</Table.Cell>
              <Table.Cell>
                <a
                  // href="/tables"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  {pat.upcoming}
                </a>
              </Table.Cell>
              <Table.Cell>...</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table> */}
      <style jsx global>{`
        .mainTable {
          @apply w-full text-[#2e4765] font-avenirMedium text-left rounded-lg mb-vw20;
        }
        .tableHead {
          @apply text-black-333;
        }

        :global(.rtl) {
          .mainTable {
            @apply text-right;
          }
        }
      `}</style>
    </div>
  )
}

PatientsTable.propTypes = {
  patients: PropTypes.array,
}

export default PatientsTable
