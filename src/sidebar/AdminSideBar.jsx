import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { sidebarData } from "./sidebarData";
import { AuthContext } from "../../utils/AuthContext";
// import LOGO from "../../assets/logo.png";
export default function AdminSideBar({ sidebarOpen, setSidebarOpen }) {
  console.log("sidebarData", sidebarData);

  const pathname = "";
  const { user } = useContext(AuthContext);

  const trigger = useRef(null);
  const sidebar = useRef(null);

  let storedSidebarExpanded = "true";
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // const toggleMenu = (index) => {
  //   console.log("index", index);
  //   console.log("id", id);
  //   console.log("show b", show);
  //   if (index === id) {
  //     setShow(!show);
  //   } else {
  //     setId(index);
  //     setShow(true);
  //   }
  //   console.log("show after", show);
  // };
  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link to="/">
          <img
            width={176}
            height={35}
            style={{ width: "auto", height: "auto" }}
            src={
              "https://neumeshlabs.com/wp-content/uploads/2020/01/dummyLogo.png"
            }
            alt="Logo"
          />
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current text-white"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {sidebarData.map((data, index) => (
            <div key={data.id}>
              {data.users && (
                <div className="mb-3 mt-5 w-full text-start text-sm font-semibold text-bodydark2">
                  {data.mainTitle}
                </div>
              )}
              {data.menuOptions.map((item) => (
                <div key={item.id}>
                  {item.users && (
                    <ul className="mb-2 flex flex-col gap-1.5" key={item.id}>
                      {item.isDrop ? (
                        <SidebarLinkGroup
                          activeCondition={
                            pathname === `/${item.route}` ||
                            pathname.includes(item.route)
                          }
                        >
                          {(handleClick, open) => {
                            return (
                              <React.Fragment>
                                <Link
                                  to="#"
                                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                    (pathname === `/${item.route}` ||
                                      pathname.includes(item.route)) &&
                                    "bg-graydark dark:bg-meta-4"
                                  }`}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    sidebarExpanded
                                      ? handleClick()
                                      : setSidebarExpanded(true);
                                  }}
                                >
                                  {item.icon}
                                  {item.title}
                                  <svg
                                    className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                      open && "rotate-180"
                                    }`}
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                      fill=""
                                    />
                                  </svg>
                                </Link>
                                <div
                                  className={`translate transform overflow-hidden ${
                                    !open && "hidden"
                                  }`}
                                >
                                  <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                    {item.subMenuOptions.map((sub) => (
                                      <li key={sub.id}>
                                        <Link
                                          to={sub.route}
                                          className={`first-letter:group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                            pathname ===
                                              "/forms/form-elements" &&
                                            "text-white"
                                          }`}
                                        >
                                          {sub.title}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </React.Fragment>
                            );
                          }}
                        </SidebarLinkGroup>
                      ) : (
                        <li>
                          <Link
                            to={item.route}
                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                              pathname.includes("enquiry") &&
                              "bg-graydark dark:bg-meta-4"
                            }`}
                          >
                            {item.icon}
                            {item.title}
                          </Link>
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
