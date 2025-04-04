// import { useState, useContext, useEffect } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { loginUser, registerUser } from "../api/authApi";
// import { useNavigate } from "react-router-dom";
// import { DotLottieReact } from "@lottiefiles/dotlottie-react";

// const Auth = () => {
//   const { user, login } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (user) {
//       navigate("/home"); // Redirect if already logged in
//     }
//   }, [user, navigate]);

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = isSignUp
//         ? await registerUser(formData)
//         : await loginUser(formData);
//       login(res.data.user);
//       navigate("/home");
//     }  catch (err) {
//       if (!isSignUp && err.response?.status === 401) {
//         setError("No user found. Try signing up.");
//       } else {
//         setError(err.response?.data?.message || "Something went wrong");
//       }
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
//         <DotLottieReact
//           src="https://lottie.host/001f3da0-ba23-4664-a9b8-37983596a1c6/0X8jBj6mit.lottie"
//           loop
//           autoplay
//         />

//         <h2 className="text-2xl font-bold text-center text-gray-800">
//           {isSignUp ? "Sign Up" : "Login"}
//         </h2>

//         {error && (
//           <p className="text-red-500 text-sm text-center mt-2">{error}</p>
//         )}

//         <form className="mt-6" onSubmit={handleSubmit}>
//           {isSignUp && (
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">
//                 Username
//               </label>
//               <input
//                 type="text"
//                 name="username"
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
//                 required
//               />
//             </div>
//           )}

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
//           >
//             {isSignUp ? "Sign Up" : "Login"}
//           </button>
//         </form>

//         <p className="mt-4 text-sm text-center text-gray-600">
//           {isSignUp ? "Already have an account?" : "Don't have an account?"}
//           <button
//             onClick={() => setIsSignUp(!isSignUp)}
//             className="ml-1 text-indigo-600 hover:underline"
//           >
//             {isSignUp ? "Login" : "Sign Up"}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Auth;
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { loginUser, registerUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Auth = () => {
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/home"); // Redirect if already logged in
    }
  }, [user, navigate]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = isSignUp
        ? await registerUser(formData)
        : await loginUser(formData);
      login(res.data.user);
      navigate("/home");
    } catch (err) {
      if (!isSignUp && err.response?.status === 401) {
        setError("No user found! Are you sure you’ve been here before? Try signing up instead!");
      } else {
        setError(err.response?.data?.message || "Hmm... that doesn’t match. Did you misplace your memory?");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <DotLottieReact
          src="https://lottie.host/001f3da0-ba23-4664-a9b8-37983596a1c6/0X8jBj6mit.lottie"
          loop
          autoplay
        />

        {/* Witty Heading */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          {isSignUp ? "Join the Memory League!" : "Welcome Back, Memory Master!"}
        </h2>

        {/* Witty Subheading */}
        {!isSignUp && <p className="text-center text-gray-600"> </p>}

        {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

        <form className="mt-6" onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                placeholder="If you remember..."
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                required
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Shh... it's a secret!"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
          >
            {isSignUp ? "Test Your Memory!" : "Prove You Remember Stuff!"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          {isSignUp ? "Already have an account?" : "New here? Let’s create an account!"}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="ml-1 text-indigo-600 hover:underline"
          >
            {isSignUp ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
