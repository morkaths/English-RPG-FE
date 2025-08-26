import { FC } from 'react';
import { Outlet } from "react-router";
import ScrollToTopRoute from 'src/components/common/shared/ScrollToTopRoute';
import Sidebar from './sidebar';
import Header from './header';
import ChatSupport from "./fab/ChatSupport";
import ScrollToTop from './fab/ScrollToTop';



const FullLayout: FC = () => {
  return (
    <>
      <div className="flex w-full min-h-screen dark:bg-darkgray">
        <div className="page-wrapper flex w-full  ">
          {/* Header/sidebar */}
          <Sidebar />
          <div className="page-wrapper-sub flex flex-col w-full dark:bg-darkgray">
            {/* Top Header  */}
            <Header />

            <div
              className={`bg-lightgray dark:bg-dark  h-full rounded-bb`}
            >
              {/* Body Content  */}
              <div
                className={`w-full`}
              >
                <ScrollToTopRoute>
                  <div className="container py-30">
                    <Outlet />
                  </div>
                </ScrollToTopRoute>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ScrollToTop />
      <ChatSupport onClick={() => { /* Xử lý mở settings hoặc chat ở đây */ }} /> {/* Thêm dòng này */}
    </>
  );
};

export default FullLayout;
