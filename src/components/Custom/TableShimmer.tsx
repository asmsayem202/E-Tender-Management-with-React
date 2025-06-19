import React from "react";

type ShimmerTableLoaderProps = {
  rows?: number;
  columns?: number;
};

const TableShimmer: React.FC<ShimmerTableLoaderProps> = ({
  rows = 10,
  columns = 4,
}) => {
  return (
    <div className="w-full border  rounded-lg overflow-hidden mt-5">
      <div className="w-full bg-secondary animate-pulse h-10"></div>
      <div className="w-full divide-y ">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex w-full p-4">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div
                key={colIndex}
                className="h-6 bg-secondary rounded w-1/4 mx-2 animate-pulse"
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableShimmer;
