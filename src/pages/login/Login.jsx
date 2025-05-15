import React from "react";
import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <div className="flex flex-row w-full md:h-screen items-center">
      <div className="py-12 flex-1 ">
        <div className="flex rounded-lg shadow-2xl overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
          <div className="hidden lg:block lg:w-1/2">
            <img
              src="https://www.lifewire.com/thmb/l0ydIful6O03ixDE221VLQN_drk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/how-do-i-find-the-windows-administrator-password-2626064-50a9e096a5d642018d44cfd0c424b643.png"
              className="w-full h-full object-cover"
              alt="logo"
            />
          </div>
          <div className="w-full p-8 lg:w-1/2">
            <h2 className="text-2xl font-semibold text-danger text-center">
              CRES
            </h2>
            <a className="bg-gray flex items-center justify-center mt-4 text-black rounded-lg shadow-md hover:bg-white">
              <h1 className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">
                CRES
              </h1>
            </a>
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b border-danger w-1/5 lg:w-1/4"></span>
              <a
                href="#"
                className="text-xs text-center text-grey-500 uppercase"
              >
                Admin Login
              </a>
              <span className="border-b w-1/5 border-danger lg:w-1/4"></span>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
