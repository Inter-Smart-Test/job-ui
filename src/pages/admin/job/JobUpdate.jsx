import { useContext, useState, useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "../../../components/breadcrumbs/Breadcrumbs";
import { UseAuth } from "../../../utils/UseAuth";
import { AYURVEDHA } from "../../../api/job";
import { TokenContext } from "../../../utils/TokenContext";

export default function JobUpdate() {
  const { checkAccessTokenValidity } = UseAuth();
  const { token } = useContext(TokenContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    _id: "",
    title: "",
    price: "",
    type: "",
    duration: "",
    isPurged: false,
  });

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    price: Yup.string().required("Required"),
  });

  useEffect(() => {
    const getAyurvedha = async (id) => {
      try {
        const res = await AYURVEDHA.GET_BY_ID(id);
        if (res.status !== 200) {
          throw new Error("Failed to fetch AYURVEDHA information");
        }
        const ayurvedhaData = res.data;
        setData({
          _id: ayurvedhaData._id,
          title: ayurvedhaData.title,
          type: ayurvedhaData.type,
          price: ayurvedhaData.price,
          duration: ayurvedhaData.duration,
          isPurged: ayurvedhaData.isPurged,
        });
      } catch (error) {
        console.error("Error loading ayurvedha: ", error);
      }
    };
    getAyurvedha(id);
  }, [id]);

  const updateData = async (formData, id) => {
    try {
      const res = await AYURVEDHA.UPDATE(formData, id, token);
      console.log("res", res.data);
      setLoading(false);
      if (res.status === 200) {
        toast.success("Updated ayurvedha");
        navigate("/ayurvedha");
      } else {
        toast.error("Failed to update ayurvedha");
        throw new Error("Failed to update ayurvedha");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error updating ayurvedha: ", error);
      if (error.response && error.response.status === 401) {
        await checkAccessTokenValidity();
        setLoading(true); // trigger re-run of the effect
      } else {
        toast.error("Failed to update ayurvedha");
      }
    }
  };

  const handleSubmit = (values) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("type", values.type);
    formData.append("duration", values.duration);
    formData.append("price", values.price);
    formData.append("isPurged", values.isPurged);
    updateData(values, data._id);
    console.log("values", values);
  };
  console.log("data._id", data._id);

  return (
    <div>
      <Breadcrumbs pageName="Update ayurvedha" />
      <div className=" rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Update Details
          </h3>
        </div>
        <Formik
          initialValues={data}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="grid grid-cols-1 gap-9 sm:grid-cols-2">
            <div className="flex flex-col gap-9 ">
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Title <span className="text-meta-1">*</span>
                  </label>
                  <Field
                    placeholder="Enter the Employee name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    name="title"
                  />
                  <ErrorMessage
                    component="a"
                    className="text-danger"
                    name="title"
                  />
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Type <span className="text-meta-1">*</span>
                  </label>
                  <Field
                    placeholder="Enter the type "
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    name="type"
                  />
                  <ErrorMessage
                    component="a"
                    className="text-danger"
                    name="type"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-9 ">
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Duration <span className="text-meta-1">*</span>
                  </label>
                  <Field
                    placeholder="Enter Title"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    name="duration"
                  />
                  <ErrorMessage
                    component="a"
                    className="text-danger"
                    name="duration"
                  />
                </div>
                <div className="mb-4.5 ">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Price <span className="text-meta-1">*</span>
                  </label>
                  <Field
                    placeholder="Enter price"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    name="price"
                  />
                  <ErrorMessage
                    component="a"
                    className="text-danger"
                    name="price"
                  />
                </div>
              </div>
            </div>
            <div className="p-6.5">
              <button
                type="submit"
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
              >
                {loading ? (
                  <div className="flex h-auto items-center justify-center ">
                    <div className="h-6 w-6 animate-spin rounded-full border-4 border-solid border-white border-t-transparent"></div>
                  </div>
                ) : (
                  "Update Ayurvedha"
                )}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
