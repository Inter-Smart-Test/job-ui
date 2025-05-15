import { useState } from "react";
import { ErrorMessage, Field, Form, Formik, useField } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../../components/breadcrumbs/Breadcrumbs";
import { UseAuth } from "../../../utils/UseAuth";
import { JOB } from "../../../api/job";

export default function JobAdd() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { checkAccessTokenValidity } = UseAuth();

    const [data, setData] = useState({
        title: "",
        price: "",
        type: "",
        duration: "",
        isPurged: false,
    });

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Required"),
        duration: Yup.string().required("Required"),
    });


    const addData = async (formData) => {
        try {
            const res = await JOB.ADD(formData);

            setLoading(false);
            if (res.status === 200) {
                toast.success("Created New job");
                navigate("/job");
            } else {
                toast.error("Failed to create a new job");
                throw new Error("Failed to create a new job");
            }
        } catch (error) {
            setLoading(false);
            console.log("error", error);
            if (error.response && error.response.status === 401) {
                await checkAccessTokenValidity();
                // retry the request after refreshing the token
            } else {
                toast.error("Failed to create a job");
            }
        }
    };

    const handleSubmit = async (values) => {
        setLoading(true);
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("price", values.price);
        formData.append("type", values.type);
        formData.append("duration", values.duration);
        addData(formData);
    };

    return (
        <div>
            <Breadcrumbs pageName="Add Ayurvedha" />
            <div className="rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Insert New Data
                    </h3>
                </div>
                <Formik
                    initialValues={data}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        handleSubmit(values);
                    }}
                >
                    <Form>
                        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 ">
                            <div className="flex flex-col gap-9 ">
                                <div className="p-6.5">
                                    <div className="mb-4.5">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Ayurvedha Title <span className="text-meta-1">*</span>
                                        </label>
                                        <Field
                                            placeholder="Enter Title"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            name="title"
                                        />
                                        <ErrorMessage
                                            component="a"
                                            className="text-danger"
                                            name="title"
                                        />
                                    </div>
                                    <div className="mb-4.5 ">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Type <span className="text-meta-1">*</span>
                                        </label>
                                        <Field
                                            placeholder="Enter type"
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
                        </div>

                        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 ">
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
                                        "Add Ayurvedha"
                                    )}
                                </button>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}