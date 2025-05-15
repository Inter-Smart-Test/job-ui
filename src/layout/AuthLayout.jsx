import React, { useContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../components/header/Header";
import Dashboard from "../pages/admin/dashboard/Dashboard";

import AdminSideBar from "../components/sidebar/AdminSideBar";

import { AuthContext } from "../utils/AuthContext";
import NoPage from "../pages/NoPage/NoPage";
import JobList from "../pages/admin/job/JobList";
import JobAdd from "../pages/admin/job/JobAdd";
import JobView from "../pages/admin/job/JobView";

export default function AuthLayout() {
  const { user } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div suppressHydrationWarning={true}>
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        <div className="flex h-screen overflow-hidden">
          <AdminSideBar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                <Routes>
                  <Route path="/">
                    {/* <Route index element={<StudentList />} /> */}
                    <Route path="dashboard" element={<Dashboard />} />

                    <Route path="job">
                      <Route index element={<JobList />} />
                      <Route path="add" element={<JobAdd />} />
                      <Route path="view/:id" element={<JobView />} />
                    </Route>

                    <Route path="*" element={<NoPage />} />
                  </Route>
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
