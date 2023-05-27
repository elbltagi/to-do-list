import { useEffect, useRef, useState } from "react";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { VscClearAll } from "react-icons/vsc";
import "./App.css";
import Task from "./Components/Task";
import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";

function App() {
  const [tasks, setTasks] = useState([]);
  const [addNew, setAddNew] = useState(false);
  const { register, handleSubmit, setValue } = useForm();
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    setValue: setValue2,
  } = useForm();
  const popForm = useRef();
  const tasksRef = useRef([]);

  useEffect(() => {
    const data = localStorage.getItem("data");
    if (data) {
      const array = JSON.parse(data);
      console.log(array);
      setTasks(array);
    }
  }, []);

  const submit = (e) => {
    setAddNew(false);
    setValue("task", "");
    setValue2("task", "");
    var array = [...tasks];
    array.push({ text: e.task, id: uuid(), complete: false });
    setTasks(array);
    save(array);
  };
  const handleChange = (index) => {
    var array = [...tasks];
    array[index].complete = !array[index].complete;
    setTasks(array);
    save(array);
  };
  const handleDelete = (index) => {
    var array = [...tasks];
    array.splice(index, 1);
    setTasks(array);
    save(array);
  };

  const save = (data) => {
    localStorage.setItem("data", JSON.stringify(data));
  };

  return (
    <div className="w-full z-0 h-screen max-md:p-14  bg-white flex max-md:items-start items-center justify-center">
      {addNew && (
        <div className="absolute h-full flex top-0 items-center justify-center  w-full md:hidden z-50 bg-[#00000075]">
          <form
            className="bg-orange-200 p-5 flex-col items-center justify-center gap-5 shadow-lg rounded-lg"
            onSubmit={handleSubmit2(submit)}
          >
            <input
              type="text"
              className="p-2 shadow-md border-2 border-white focus:border-orange-400 transition-all outline-0 rounded-md"
              placeholder="Task...."
              {...register2("task")}
              autoFocus
            />
            <div className="flex mt-5 gap-2">
              <button
                type="submit"
                className="bg-orange-400 text-orange-200 border-2 border-orange-400 hover:bg-orange-200 hover:text-orange-400 transition-all p-2 rounded-md shadow-md font-RobotoMono font-semibold"
              >
                confirm
              </button>
              <button
                type="button"
                onClick={() => {
                  setAddNew(false);
                  setValue("task", "");
                }}
                className="bg-red-600 font-RobotoMono font-semibold hover:text-red-600 hover:bg-gray-900 transition-all text-gray-900 p-2 rounded-md shadow-md "
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="h-[97%] min-w-[400px]  flex flex-col gap-4 w-1/3 p-7 rounded-lg">
        <h1 className="bg-orange-200 max-md:hidden font-RobotoMono font-medium text-orange-400 text-2xl text-center  shadow-lg p-5 rounded-lg">
          Today's Tasks
        </h1>
        <div className="flex-1 z-10 bg-orange-200 p-4 shadow-xl relative rounded-lg">
          {tasks &&
            tasks.map((item, index) => {
              return (
                <Task
                  handleDelete={() => handleDelete(index)}
                  text={item.text}
                  complete={item.complete}
                  id={item.id}
                  ref={(el) => (tasksRef.current[index] = el)}
                  handleChange={() => handleChange(index)}
                />
              );
            })}
          <div className="h-full max-md:bottom-full max-md:h-min max-md:mb-4 max-md:flex-row md:top-0 absolute flex flex-col gap-4 md:left-full md:ml-4 ">
            {!addNew ? (
              <button
                onClick={() => {
                  setAddNew(true);
                  popForm.current.focus();
                }}
                className="bg-orange-200 text-orange-500 p-4 rounded-lg shadow-lg hover:bg-orange-400 hover:text-orange-200 transition-all"
              >
                <MdOutlineLibraryAdd size={25} />
              </button>
            ) : (
              <form
                className="bg-orange-200 p-5 flex max-md:hidden flex-col items-center justify-center gap-5 shadow-lg rounded-lg"
                onSubmit={handleSubmit(submit)}
              >
                <input
                  type="text"
                  ref={(el) => (popForm.current = el)}
                  className="p-2 shadow-md border-2 border-white focus:border-orange-400 transition-all outline-0 rounded-md"
                  placeholder="Task...."
                  {...register("task", { required: true })}
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-orange-400 text-orange-200 border-2 border-orange-400 hover:bg-orange-200 hover:text-orange-400 transition-all p-2 rounded-md shadow-md font-RobotoMono font-semibold"
                  >
                    add new
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAddNew(false);
                      setValue("task", "");
                    }}
                    className="bg-red-600 font-RobotoMono font-semibold hover:text-red-600 hover:bg-gray-900 transition-all text-gray-900 p-2 rounded-md shadow-md "
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
            {tasks.length ? (
              <button
                onClick={() => {
                  setTasks([]);
                  save([]);
                }}
                className="bg-orange-200 text-orange-500 inline w-min p-4 rounded-lg shadow-lg hover:bg-orange-400 hover:text-orange-200 transition-all"
              >
                <VscClearAll size={25} />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
