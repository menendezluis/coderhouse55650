import React from "react";

function Card(props) {
  const { children } = props;
  return (
    <div className="mx-4 my-4 p-4 bg-white shadow-lg rounded-lg w-150 h-150 text-center">
      {children}
    </div>
  );
}

export default Card;
