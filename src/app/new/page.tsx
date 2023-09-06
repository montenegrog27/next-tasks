// "use client";
// import axios from "axios";
// import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// function NewPage({ params }: { params: { id: string } }) {
//   // console.log(params);
//   useEffect(() => {
//     if (params.id) {
//       axios.get(`/api/tasks/${params.id}`).then((res) => {
//         setValue("description", res.data.description);
//         setValue("title", res.data.title);
//         setValue("end", false);
//         setValue("dateStart", datepe());
//       });
//     }
//   }, []);

//   const router = useRouter();
//   const { handleSubmit, register, setValue } = useForm();

//   const onSumbit = handleSubmit(async (data) => {
//     if (params.id) {
//       await axios.put(`/api/tasks/${params.id}`, data);
//       console.log("actualizando");
//     } else {
//       await axios.post("/api/tasks", data);
//     }
//     router.push("/");
//     router.refresh();
//   });

//   function datepe() {

//   }

//   return (
//     <section className="h-[calc(100vh-7rem)] flex items-center justify-center">
//       <form onSubmit={onSumbit}>
//         <h1 className="text-3xl font-bold">
//           {params.id ? "Update " : "Create "}Task
//         </h1>
//         <label htmlFor="title">Write your title</label>
//         <input
//           id="title"
//           className="mb-2 block px-3 py-1 border-1 shadow rounded bg-slate-200 focus:bg-white text-black"
//           type="text"
//           placeholder="Write a title"
//           {...register("title")}
//         />
//         <label htmlFor="description">Write your title</label>

//         <textarea
//           id="description"
//           className="block px-3 w-full py-1 border-1 shadow rounded bg-slate-200 focus:bg-white text-black"
//           placeholder="Write a description"
//           {...register("description")}
//         ></textarea>

//         <label htmlFor="end">Write your title</label>
//         <input type="checkbox" checked={false} id="end" {...register("end")} />
//         <div>
//           <label htmlFor="dateStart">Fecha de Inicio</label>
//           <input
//             type=""
//             id="dateStart"
//             {...register("dateStart")}
//           />
//         </div>
//         <div className="flex justify-between ">
//           <button type="submit" className="py-1 px-2 rounded-xl bg-sky-500 m-2">
//             {params.id ? "Update" : "Create"}
//           </button>
//           {params.id ? (
//             <button
//               onClick={async () => {
//                 if (confirm("Are you sure you want to delete this task?")) {
//                   await axios.delete(`/api/tasks/${params.id}`);
//                   router.push("/");
//                   router.refresh();
//                 } else {
//                 }
//               }}
//               type="button"
//               className="py-1 px-2 rounded-xl bg-red-500 m-2"
//             >
//               Delete
//             </button>
//           ) : (
//             <button
//               disabled
//               onClick={async () => {
//                 if (confirm("Are you sure you want to delete this task?")) {
//                   await axios.delete(`/api/tasks/${params.id}`);
//                   router.push("/");
//                   router.refresh();
//                 } else {
//                 }
//               }}
//               type="button"
//               className="py-1 px-2 rounded-xl bg-red-500 m-2"
//             >
//               Delete
//             </button>
//           )}
//         </div>
//       </form>
//     </section>
//   );
// }

// export default NewPage;
"use client";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function NewPage({ params }: { params: { id: string } }) {
  const [dateStart, setDateStart] = useState<boolean>(false); // Estado para dateStart
  const today = new Date().toISOString();
  console.log(today);

  useEffect(() => {
    if (params.id) {
      axios.get(`/api/tasks/${params.id}`).then((res) => {
        setValue("description", res.data.description);
        setValue("title", res.data.title);
        setValue("end", false);
        const spl = res.data.dateStart.split(16);
        const spl2 = spl[0];
        // Formatear la fecha y establecerla en el estado
        setValue("createdAt", spl2);
      });
    }
  }, []);

  const router = useRouter();
  const { handleSubmit, register, setValue } = useForm();

  const onSumbit = handleSubmit(async (data) => {
    if (data.createdAt.length > 16) {
      if (params.id) {
        await axios.put(`/api/tasks/${params.id}`, data);
        setDateStart(data.createdAt);
        console.log("actualizando");
      } else {
        await axios.post("/api/tasks", data);
      }
    } else {
      data.createdAt = data.createdAt + ":00.000Z";
      if (params.id) {
        await axios.put(`/api/tasks/${params.id}`, data);
        setDateStart(data.createdAt);

        console.log("actualizando");
      } else {
        if (!data.createdAt) {
          console.log("falta fecha");
        }
        await axios.post("/api/tasks", data);
      }
    }

    router.push("/");
    router.refresh();
  });

  // // Función para formatear la fecha en formato ISO-8601

  return (
    <section className="h-[calc(100vh-7rem)] flex items-center justify-center">
      <form onSubmit={onSumbit} className="bg-slate-800 p-7 rounded">
        <h1 className="text-3xl font-bold">
          {params.id ? "Update " : "Create "}Task
        </h1>
        <label htmlFor="title">Write your title</label>
        <input
          id="title"
          className="mb-4 block px-3 py-1 border-1 shadow rounded bg-slate-200 focus:bg-white text-black"
          type="text"
          placeholder="Write a title"
          {...register("title")}
        />
        <label htmlFor="description">Write your title</label>

        <textarea
          id="description"
          className="block mb-4 px-3 w-full py-1 border-1 shadow rounded bg-slate-200 focus:bg-white text-black"
          placeholder="Write a description"
          {...register("description")}
        ></textarea>

        <input type="checkbox" checked={false} id="end" {...register("end")} />
        <div className="mt-5">
          <label htmlFor="createdAt">Start date</label>
          <input
            className="text-black ml-2 rounded"
            type="datetime-local"
            id="createdAt"
            {...register("createdAt", {
              onChange: () => {
                setDateStart(true);
              },
            })}
          />
        </div>
        <div className="flex justify-between ">
          {dateStart ? (
            <button
              type="submit"
              className="py-1 px-2 rounded-xl bg-sky-500 m-2"
            >
              {params.id ? "Update" : "Create"}
            </button>
          ) : (
            <button
              disabled
              type="submit"
              className="py-1 px-2 rounded-xl bg-sky-500 m-2"
            >
              {params.id ? "Update" : "Create"}
            </button>
          )}

          {params.id ? (
            <button
              onClick={async () => {
                if (confirm("Are you sure you want to delete this task?")) {
                  await axios.delete(`/api/tasks/${params.id}`);
                  router.push("/");
                  router.refresh();
                } else {
                }
              }}
              type="button"
              className="py-1 px-2 rounded-xl bg-red-500 m-2"
            >
              Delete
            </button>
          ) : (
            <button
              disabled
              onClick={async () => {
                if (confirm("Are you sure you want to delete this task?")) {
                  await axios.delete(`/api/tasks/${params.id}`);
                  router.push("/");
                  router.refresh();
                } else {
                }
              }}
              type="button"
              className="py-1 px-2 rounded-xl bg-red-500 m-2"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default NewPage;
