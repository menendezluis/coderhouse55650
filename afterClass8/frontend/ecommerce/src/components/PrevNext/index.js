import React from "react";

function PrevNext(props) {
  const { hasPrev, hasNext, currentPage, handlePage } = props;
  return (
    <div className="inline-flex">
      {hasPrev && (
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
          onClick={() => handlePage(-1)}
        >
          Prev
        </button>
      )}
      <span>{currentPage}</span>
      {hasNext && (
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
          onClick={() => handlePage(1)}
        >
          Next
        </button>
      )}
    </div>
  );
}

export default PrevNext;
