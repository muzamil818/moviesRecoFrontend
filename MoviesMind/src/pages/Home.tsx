import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getUsers } from "../api/api";

import type { User } from "../types/movie";

function Home() {

  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState("");

  const navigate = useNavigate();

  // FETCH USERS
  const fetchUsers = async () => {

    try {

      const data = await getUsers();

      setUsers(data);

    } catch (error) {

      console.log(error);

    }
  };

  // USE EFFECT
  useEffect(() => {

    fetchUsers();

  }, []);

  // HANDLE START
  const handleStart = () => {

    if (!selectedUser) {

      alert("Please select a user");

      return;
    }

    localStorage.setItem(
      "userId",
      selectedUser
    );

    navigate("/movies");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">

      <div className="bg-zinc-900 w-full max-w-md rounded-2xl p-8 shadow-2xl border border-zinc-800">

        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">

          Movies
          <span className="text-red-600">
            Mind
          </span>

        </h1>

        <p className="text-zinc-400 text-center mb-8">
          Select your profile to continue
        </p>

        <select
          value={selectedUser}
          onChange={(e) =>
            setSelectedUser(e.target.value)
          }
          className="w-full bg-zinc-800 text-white p-4 rounded-xl border border-zinc-700 outline-none focus:border-red-600 transition"
        >

          <option value="">
            Select User
          </option>

          {users.map((user) => (

            <option
              key={user.UserID}
              value={user.UserID}
            >
              {user.UserName}
            </option>

          ))}

        </select>

        <button
          onClick={handleStart}
          className="w-full mt-6 bg-red-600 hover:bg-red-700 transition-all duration-300 text-white py-4 rounded-xl font-semibold"
        >
          Start Watching
        </button>

      </div>

    </div>
  );
}

export default Home;