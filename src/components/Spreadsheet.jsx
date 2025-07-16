import React, { useState, useEffect, useRef } from 'react';
import Tabs from './Tabs';
import Spinner from './Spinner';

// Column definitions
const columns = [
  { Header: '#', accessor: 'id' },
  { Header: 'Job Request', accessor: 'job' },
  { Header: 'Submitted', accessor: 'submitted' },
  { Header: 'Status', accessor: 'status' },
  { Header: 'Submitter', accessor: 'submitter' },
  { Header: 'URL', accessor: 'url' },
  { Header: 'Assigned', accessor: 'assigned' },
  { Header: 'Priority', accessor: 'priority' },
  { Header: 'Due Date', accessor: 'dueDate' },
  { Header: 'Est. Value', accessor: 'value' },
];

export default function Spreadsheet() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCell, setActiveCell] = useState({ row: 0, col: columns[0].accessor });
  const [editCell, setEditCell] = useState(null);
  const [activeTab, setActiveTab] = useState('All Orders');
  const inputRef = useRef(null);

  // Fetch data.json from public
  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      });
  }, []);

  // Focus on input when editing
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [editCell]);

  const handleKeyDown = e => {
    const { row, col } = activeCell;
    const colIndex = columns.findIndex(c => c.accessor === col);
    let newRow = row;
    let newCol = colIndex;
    if (e.key === 'ArrowDown') newRow = Math.min(data.length - 1, row + 1);
    if (e.key === 'ArrowUp') newRow = Math.max(0, row - 1);
    if (e.key === 'ArrowRight') newCol = Math.min(columns.length - 1, colIndex + 1);
    if (e.key === 'ArrowLeft') newCol = Math.max(0, colIndex - 1);
    setActiveCell({ row: newRow, col: columns[newCol].accessor });
  };

  // Filter rows by activeTab
  const filteredData = data.filter(row => {
    if (activeTab === 'All Orders') return true;
    if (activeTab === 'Pending') return ['Need to start', 'In-process'].includes(row.status);
    if (activeTab === 'Reviewed') return row.status === 'Complete';
    if (activeTab === 'Arrived') return row.status === 'Blocked';
    return true;
  });

  if (loading) return <Spinner />;

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div
        className="overflow-auto flex-1 p-6"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {columns.map(col => (
                <th
                  key={col.accessor}
                  className="px-4 py-2 text-base font-semibold leading-6 text-left border-b border-gray-300"
                >
                  {col.Header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, rowIdx) => (
              <tr key={row.id} className="hover:bg-gray-100">
                {columns.map(col => {
                  const value = row[col.accessor];
                  const isActive = activeCell.row === rowIdx && activeCell.col === col.accessor;
                  const isEditing = editCell && editCell.row === rowIdx && editCell.col === col.accessor;
                  // Determine content
                  let cellContent;
                  if (col.accessor === 'status') {
                    cellContent = <span className={`px-2 py-1 text-xs font-medium rounded ${row.status === 'In-process' ? 'bg-yellow-100 text-yellow-800' : row.status === 'Need to start' ? 'bg-blue-100 text-blue-800' : row.status === 'Complete' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{value}</span>;
                  } else if (col.accessor === 'priority') {
                    cellContent = <span className={`font-semibold ${row.priority === 'Medium' ? 'text-yellow-600' : row.priority === 'High' ? 'text-red-600' : 'text-blue-600'}`}>{value}</span>;
                  } else if (isEditing) {
                    cellContent = (
                      <input
                        ref={inputRef}
                        defaultValue={value}
                        className="w-full p-1 text-sm"
                        onBlur={e => {
                          const newData = [...data];
                          newData[rowIdx][col.accessor] = e.target.value;
                          setData(newData);
                          setEditCell(null);
                        }}
                        onKeyDown={e => e.key === 'Enter' && e.target.blur()}
                      />
                    );
                  } else {
                    cellContent = value;
                  }

                  return (
                    <td
                      key={col.accessor}
                      className={`px-4 py-2 text-sm leading-5 text-left border-b border-gray-200 ${isActive ? 'ring-2 ring-blue-400' : ''}`}
                      onClick={() => setActiveCell({ row: rowIdx, col: col.accessor })}
                      onDoubleClick={() => setEditCell({ row: rowIdx, col: col.accessor })}
                    >
                      {cellContent}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Tabs active={activeTab} onSelect={setActiveTab} />
    </div>
  );
}
