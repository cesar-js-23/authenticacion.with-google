import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Home = () => {
  const { user, logout, loading } = useAuth();
  const navegate = useNavigate();

  const [hours, setHours] = useState("");

  const handleLogout = async () => {
    try {
      await logout();
      navegate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const getData = () => {
    const fecha = new Date();
    const date = fecha.getDate();
    const month = fecha.getMonth();
    const year = fecha.getFullYear();

    let mesAnyo = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    const obj = {
      date,
      month: `${mesAnyo[month]}`,
      year,
    };
    return `${obj.date} de ${obj.month} del ${year}`;
  };

  const getHour = () => {
    const fecha = new Date().toLocaleTimeString();
    setHours(fecha);
  };

  setInterval(getHour, 1000);

  if (loading) {
    return <h1>Loading..</h1>;
  }
  return (
    <div className="w-scree h-screen flex flex-col justify-center items-center gap-4">
      <div className=" bg-white flex flex-col justify-center items-center rounded-lg mx-auto max-w-sm shadow-xl">
        <div className="py-4 px-6 flex flex-col gap-2 text-center">
          <p className="text-2xl font-bold text-gray-700">Bienvenido</p>
          <p className="text-gray-500">{user.displayName || user.email}</p>
        </div>

        <div>
          {!user.photoURL ? (
            <img
              src="https://lh3.googleusercontent.com/a-/ACNPEu_-9aldbNZTBavYvtZW6lTXk3AahC1LZFufZG3dpw=s96-c"
              alt="mio"
            ></img>
          ) : (
            <img
              className="w-full object-cover rounded-full"
              src={user.photoURL}
              alt="foto"
            />
          )}
        </div>
        {/* <p>{user.metadata.lastSignInTime}</p> */}

        <div className="py-4 px-6 flex flex-col items-center justify-evenly bg-gray-800 rounded-bl-lg rounded-br-lg">
          <span className="text-white font-bold">
            {/* {user.reloadUserInfo.lastRefreshAt} */}
            {getData()}
          </span>
          <div className="flex  justify-evenly items-center gap-3">
            <p className="text-white font-bold">
              {/* {user.reloadUserInfo.lastRefreshAt} */}
              Ingreso :{" "}
            </p>
            <p className="text-white font-bold">
              {/* {user.reloadUserInfo.lastRefreshAt} */}
              {hours}
            </p>
          </div>
          {/* <button
            onClick={handleLogout}
            className="text-gray-200 hover:text-white transition-colors font-semibold outline-none"
          >
            Salir
          </button> */}
        </div>
      </div>

      <div>
        <button
          onClick={handleLogout}
          type="button"
          class="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2 gap-3 "
        >
          <svg
            aria-hidden="true"
            class="ml-2 -mr-1 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <p>Salir</p>
        </button>
      </div>
    </div>
  );
};

export default Home;
