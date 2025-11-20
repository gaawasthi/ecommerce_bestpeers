import React from 'react';

const Table = ({ columns, data, actions }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            {columns.map(col => (
              <th key={col} className="text-left px-4 py-2">{col}</th>
            ))}
            {actions && <th className="px-4 py-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-b">
              {columns.map(col => <td key={col} className="px-4 py-2">{row[col]}</td>)}
              {actions && (
                <td className="px-4 py-2 space-x-2">
                  {actions.map(action => (
                    <button
                      key={action.label}
                      onClick={() => action.onClick(row)}
                      className="text-red-500 hover:underline"
                    >
                      {action.label}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
