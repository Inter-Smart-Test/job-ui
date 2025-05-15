import { ErrorMessage, Field, Formik, Form } from "formik";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { AuthContext } from "../../utils/AuthContext";
import { TokenContext } from "../../utils/TokenContext";
import { USER } from "../../api/user";
import { useNavigate } from "react-router-dom";
export default function LoginForm() {
  //constant variables
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const { setToken } = useContext(TokenContext);
  //constant variables

  //useState
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [data] = useState({
    name: "",
    password: "",
  });
  //useState

  //dependant functions
  const saveData = async (user, token) => {
    try {
      await localStorage.setItem("user", JSON.stringify(user));
      await localStorage.setItem("token", token);
      // console.log("Data successfully saved");
    } catch (e) {
      // console.log("Failed to save the data to the storage");
    }
  };
  //dependant functions

  //login function
  const handleSubmit = async (values) => {
    // console.log("handleSubmit", values);
    setLoading(true);
    try {
      const res = await USER.LOGIN(values);
      // console.log("res.data", res.data);
      setLoading(false);
      if (res.status === 200) {
          setToken(res.data.accessToken);
          setUser(res.data.admin);
          navigate("/");
          saveData(res.data.admin, res.data.accessToken);
          toast.success("Successfully Logged In");
       
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      setLoading(false);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to Login");
      }
      // toast.error("Failed to Login");
      // console.log(error);
    }
  };
  //login function

  return (
    <Formik
      initialValues={data}
      validationSchema={loginSchema}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      <Form className="w-full">
        <div className="flex flex-col py-2">
          <label htmlFor="Email">User Name</label>
          <Field
            id="name"
            name="name"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          <ErrorMessage className="text-red" component="a" name="name" />
        </div>
        <div>
          <label htmlFor="Email">Password</label>
          <div className="w-full relative flex justify-end items-center">
            <Field
              type={show ? "text" : "password"}
              id="password"
              name="password"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
            <button
              type="button"
              className="absolute mr-3 h-5"
              onClick={() => setShow(!show)}
            >
              <img
                src={
                  !show
                    ? "https://cdn-icons-png.flaticon.com/512/25/25186.png"
                    : "https://icons.veryicon.com/png/o/internet--web/property-2/closed-eyes.png"
                }
                alt="eye"
                style={{ width: "100%", height: "100%" }}
                className=" object-contain"
              />
            </button>
          </div>
          <ErrorMessage className="text-red" component="a" name="password" />
        </div>
        <div>
          <button
            type="submit"
            className="mt-5 flex w-full justify-center rounded bg-gray p-3 font-medium text-black hover:bg-primary hover:text-gray"
          >
            {loading ? (
              <div className="flex h-auto items-center justify-center ">
                <div className="h-6 w-6 animate-spin rounded-full border-4 border-solid border-white border-t-transparent"></div>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </div>
      </Form>
    </Formik>
  );
}
const loginSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  password: Yup.string().required("Required").min(3, "Too Short!"),
});
