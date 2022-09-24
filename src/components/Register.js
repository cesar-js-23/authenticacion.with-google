import { useState } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { signup, loginWithGoogle } = useAuth();
  const [error, setError] = useState();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      navigate("/home");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup(user.email, user.password);
      navigate("/home");
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setError("Correo Invalido");
      }
      if (error.code === "auth/weak-password") {
        setError("El password debe tener más de 6 digitos");
      }
      if (error.code === "auth/email-already-in-use") {
        setError(`El correo ${user.email} esta en uso`);
      }
      // setError(error.code);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      <div className="flex flex-col items-center justify-center bg-gray-100 rounded-tl-lg rounded-bl-lg p-4">
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-4xl font-bold text-gray-900">Bienvenido</h1>
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center gap-2 bg-gray-200 py-2 px-4 rounded-lg"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M3.064 7.51A9.996 9.996 0 0 1 12 2c2.695 0 4.959.99 6.69 2.605l-2.867 2.868C14.786 6.482 13.468 5.977 12 5.977c-2.605 0-4.81 1.76-5.595 4.123-.2.6-.314 1.24-.314 1.9 0 .66.114 1.3.314 1.9.786 2.364 2.99 4.123 5.595 4.123 1.345 0 2.49-.355 3.386-.955a4.6 4.6 0 0 0 1.996-3.018H12v-3.868h9.418c.118.654.182 1.336.182 2.045 0 3.046-1.09 5.61-2.982 7.35C16.964 21.105 14.7 22 12 22A9.996 9.996 0 0 1 2 12c0-1.614.386-3.14 1.064-4.49z"></path>
              </g>
            </svg>
            Registrate con Google
          </button>
        </div>

        <div className="my-14">
          <p className="text-center relative text-gray-500 bg-gray-100 before:max-w-[50px] md:before:max-w-[120px] before:w-full before:-left-[60px] md:before:-left-[140px] before:h-[1px] before:bg-current before:absolute before:top-[50%] after:max-w-[50px] md:after:max-w-[120px] after:w-full after:h-[1px] after:bg-current after:absolute after:top-[50%] after:-right-[60px] md:after:-right-[140px]">
            Registrate con tu email
          </p>
        </div>

        <div className="w-full mb-8">
          {error && (
            <p className="text-center relative mb-5 text-red-500 bg-gray-100 before:max-w-[50px] md:before:max-w-[120px] before:w-full before:-left-[60px] md:before:-left-[140px] before:h-[1px] before:bg-current before:absolute before:top-[50%] after:max-w-[50px] md:after:max-w-[120px] after:w-full after:h-[1px] after:bg-current after:absolute after:top-[50%] after:-right-[60px] md:after:-right-[140px]">
              {error}
            </p>
          )}
          <form onSubmit={handleSubmit}>
            {/* <label htmlFor="email">Email</label> */}
            <div className="flex justify-center mb-6">
              <input
                type="email"
                name="email"
                className="w-full max-w-md py-2 px-4 rounded-lg outline-none"
                placeholder="Correo electrónico"
                onChange={handleChange}
              />
            </div>

            {/* <label htmlFor="password">Password</label> */}
            <div className="flex justify-center mb-6">
              <input
                type="password"
                name="password"
                className="w-full max-w-md py-2 px-4 rounded-lg outline-none"
                id="password"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>

            <div className="w-full max-w-md mx-auto">
              <button
                type="submit"
                className="w-full bg-gray-200 py-2 px-4 rounded-lg text-gray-900 hover:bg-gray-300 transition-colors"
              >
                Crear cuenta
              </button>
            </div>
            {/* <button>Register</button> */}
          </form>
        </div>

        <div>
          <span className="text-gray-500">
            ¿Ya tienes cuenta?{" "}
            <Link
              to="/login"
              className="text-gray-900 hover:underline transition-all"
            >
              Ingresa
            </Link>
          </span>
        </div>
      </div>

      <div className="hidden lg:flex items-center justify-center border-t border-r border-b rounded-tr-lg rounded-br-lg">
        <img
          src="https://img.freepik.com/vector-gratis/ilustracion-concepto-inicio-sesion_114360-739.jpg"
          className="w-full object-cover"
          alt="logo"
        />
      </div>
    </div>
  );
};

export default Register;
