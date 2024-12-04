import React from "react";
import useAuthHook from "./hooks/useAuthHook";

export const LOGIN_PAGE = () => {
  const { loading, formik } = useAuthHook();
  return (
    <section className="bg-pharma animate-gradient flex items-center justify-center w-full h-[100vh]">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow-md border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl">
              Welcome back to MBO pharma!
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor="username" className="capitalize block mb-2 text-sm font-medium text-gray-900">username</label>
                <input type="username" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900"> Password </label>
                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required
                value={formik.values.password}
                onChange={formik.handleChange}
                />
              </div>
              <button type="submit" className="flex items-center justify-center gap-1 w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                <span>{loading ? "Logging in..." : "Login"}</span>
                <img src={require("../../assets/login-icon.png")} alt="Login Icon" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
