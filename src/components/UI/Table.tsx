import React from "react";

const ObjectTable = ({ data }: { data: Record<string, any>[] }) => {
   // Get all unique keys from the objects in the data array
   const allKeys = new Set<string>();
   data.forEach((obj) => Object.keys(obj).forEach((key) => allKeys.add(key)));

   // Convert each object to an array of TableColumn objects
   const tableData = data.map((obj) =>
      Array.from(allKeys).map((key) => ({
         key,
         value: obj[key] !== undefined ? obj[key].toString() : "",
      })),
   );

   // Render the table structure
   return (
      <table className="table-auto w-full text-left border-2 border-green-400">
         <thead>
            <tr className="bg-green-500 text-white capitalize">
               {Array.from(allKeys).map((key) => (
                  <th key={key} className="px-4 py-2">
                     {key}
                  </th>
               ))}
            </tr>
         </thead>
         <tbody>
            {tableData.map((row, index) => (
               <tr key={index} className="border-b border-gray-300">
                  {row.map((column) => (
                     <td key={column.key} className="px-4 py-2">
                        {column.value}
                     </td>
                  ))}
               </tr>
            ))}
         </tbody>
      </table>
   );
};

export default ObjectTable;
