"use client";
import { Task } from "@prisma/client";
import { useRouter } from "next/navigation";
import End from "./End";

interface Props {
  tas: Task;
  disableClick?: boolean;
}

async function TaskCard({ tas, disableClick }: Props) {
  const router = useRouter();

  return (
    <>
      <div
        onClick={() => {
          if (!disableClick) {
            router.push(`/task/edit/${tas.id}`);
          }
        }}
        className={`rounded border-2 py-5 px-2 my-2 ${
          disableClick
            ? "cursor-not-allowed opacity-40"
            : "hover:bg-slate-800 hover:cursor-pointer bg-gray-900"
        }`}
      >
        <h1 className="font-bold text-xl">{tas.title}</h1>
        <p className="text-slate-400">{tas.description}</p>
      </div>
      <End tas={tas} />
    </>
  );
}

export default TaskCard;
