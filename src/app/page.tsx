import React from "react";
import { prisma } from "@/libs/prisma";
import { Task } from "@prisma/client";
import Date from "@/components/Date";
import TaskList from "@/components/TaskList";
import axios from "axios";

async function loadTasks() {
  //! opcion 1 con axios a una ruta
  const tasks = await axios.get("http://localhost:3000/api/tasks");
  // console.log(data);

  //! opcion 2 con prisma
  // const tasks = await prisma.task.findMany();
  // console.log(tasks);
  return tasks.data;
}

async function HomePage() {
  const tasks = await loadTasks();

  return (
    <section className="   flex justify-center items-center ">
      <div className="grid  grid-cols-1 w-screen">
        <h2 className=" text-4xl flex justify-center">
          <Date />
        </h2>
        <TaskList tasks={tasks} />
      </div>
    </section>
  );
}

export default HomePage;
