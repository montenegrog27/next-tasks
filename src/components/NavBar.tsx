import Link from "next/link";
import React from "react";

function NavBar() {
  return (
    <nav className="flex justify-around mt-2 items-center  ">
      <Link href="/">
        <h3 className="text-2xl font-bold">NextCRUD</h3>
      </Link>
      <ul>
        <li>
          <Link
            className="text-slate-200 text-xl bg-sky-600 px-3 rounded-xl py-1 mt-2 hover:text-slate-400"
            href="/new"
          >
            New
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
