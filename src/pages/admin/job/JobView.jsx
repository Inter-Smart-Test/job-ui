import {  useState } from "react";
import { useEffect } from "react";
import { JOB } from "../../../api/job";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../../../components/breadcrumbs/Breadcrumbs";


export default function JobView() {
  let { id } = useParams();
  const [data, setData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
  });

  const getJob = async (id) => {
    try {
      const res = await JOB.GET_BY_ID(id);
      if (res.status !== 200) {
        throw new Error("Failed to fetch events information");
      }
      console.log("s",res)
      setData({
        ...data,
        _id: res.data._id,
        title: res.data.title,
        description: res.data.description,
        company: res.data.company,
        location: res.data.location,
        salary: res.data.salary,
        
      });
      data._id = res.data._id;
      data.title = res.data.title;
      data.location = res.data.location;
      data.description = res.data.description;
      data.company = res.data.company;
      data.salary = res.data.salary;
    } catch (error) {
      console.log("Error loading topics: ", error);
      }
   
  };
  useEffect(() => {
    getJob(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <div>
      <Breadcrumbs pageName="View Job" />
      <div className=" rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            {data.title}
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
          <div className="flex flex-col gap-9 ">
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Title <span className="text-meta-1">*</span>
                </label>
                <p className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                  {data.title}
                </p>
              </div>
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Type <span className="text-meta-1">*</span>
                </label>
                <p className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                  {data.description}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-9 h-auto">
            <div className="p-6.5 h-auto">
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Price <span className="text-meta-1">*</span>
                </label>
                <p className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                  {data.company}
                </p>
              </div>
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Duration <span className="text-meta-1">*</span>
                </label>
                <p className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                  {data.location}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}