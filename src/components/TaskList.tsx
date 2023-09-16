import React from "react";
import TaskCard from "@/components/TaskCard";
import { Task } from "@prisma/client";

function TaskList({ tasks }: { tasks: Task[] }) {
  const today = new Date().toLocaleDateString();
  const yesterday = new Date(today);
  const tomorrow = new Date(today);

  const tasksToday = tasks.filter(
    (task) => new Date(task.createdAt).toLocaleDateString() === today
  );

  const tasksYesterday = tasks.filter(
    (task) =>
      // new Date(task.createdAt) >= yesterday &&
      new Date(task.createdAt).toLocaleDateString() < today
  );
  const tasksTomorrow = tasks.filter(
    (task) =>
      // new Date(task.createdAt) >= tomorrow &&
      new Date(task.createdAt).toLocaleDateString() > today
  );
  console.log("tareas", tasks);
  console.log("tareas de hoy", today);

  console.log("de mañana???", tasksTomorrow);

  return (
    <div className="grid grid-cols-3 ">
      <div className=" ">
        <h2 className="text-xl items-center p-5 flex justify-center w-full ">
          Tareas de ayer
        </h2>
        <div className="p-3">
          {tasksYesterday.map((task) => (
            <TaskCard key={task.id} tas={task} disableClick={true} />
          ))}
        </div>
      </div>
      <div className="   p-5 h-screen bg-transparent  items-start  justify-center">
        <div className=" grid grid-cols-1 justify-end w-full  ">
          <h2 className="text-xl  tems-center flex justify-center w-full ">
            Tareas de Hoy
          </h2>
          <div className=" p-3 ">
            {tasksToday.map((task) => (
              <TaskCard key={task.id} tas={task} disableClick={false} />
            ))}
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-xl tems-center p-5 flex justify-center w-full ">
          Tareas Mañana
        </h2>
        <div className="opacity-40 p-3 ">
          {tasksTomorrow.map((task) => (
            <TaskCard key={task.id} tas={task} disableClick={false} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TaskList;
