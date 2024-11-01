'use client';

const TableLoading = ({ columns, rows = 5 }) => {
  return (
    <div className="w-full animate-pulse">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* Table Header */}
        <div className="bg-gray-100 grid grid-cols-12 p-4 border-b">
          {[...Array(columns)].map((_, index) => (
            <div key={index} className="col-span-2 h-4 bg-gray-300 rounded" />
          ))}
        </div>

        {/* Table Rows */}
        {[...Array(rows)].map((_, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-12 p-4 border-b items-center space-x-4">
            {[...Array(columns)].map((_, colIndex) => (
              <div key={colIndex} className="col-span-2 h-4 bg-gray-200 rounded" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableLoading;
