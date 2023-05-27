import React, { useEffect, useState, forwardRef } from "react";
import { AiOutlineDelete } from "react-icons/ai";

const Task = forwardRef((props, ref) => {
  const [deleteMode, setDeleteMode] = useState(false);
  const [complete, setComplete] = useState(props.complete);

  useEffect(() => {
    setComplete(props.complete);
  }, [props.complete]);

  return (
    <div
      onMouseEnter={() => {
        setTimeout(() => setDeleteMode(true), 200);
      }}
      onMouseLeave={() => {
        setTimeout(() => setDeleteMode(false), 200);
      }}
      className="relative mb-4 items-center z-20 flex w-full"
      ref={ref}
    >
      <label
        className={`flex z-30 justify-between ${
          !deleteMode ? "w-full" : "w-[85%]"
        } items-center shadow-md p-4 ${
          complete ? "bg-gray-400" : "bg-orange-400"
        } cursor-pointer rounded-lg  text-gray-800 transition-all`}
        key={props.id}
      >
        <p
          className={`font-RobotoMono ${
            complete ? "line-through text-gray-500" : ""
          } flex gap-3 font-semibold select-none`}
        >
          <input
            type="checkbox"
            onChange={props.handleChange}
            checked={props.complete}
            className="scale-125"
            name={props.id}
          />
          {props.text}
        </p>
      </label>
      <div
        onClick={props.handleDelete}
        className=" cursor-pointer absolute z-20 flex rounded-lg p-0 text-gray-900 top-0 items-center transition-all hover:bg-gray-900 hover:text-yellow-400 right-0 bg-yellow-400 h-full px-2"
      >
        <AiOutlineDelete size={30} />
      </div>
    </div>
  );
});

export default Task;
