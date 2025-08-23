
import { useState, useEffect } from "react";
import { Button, Navbar, Drawer } from "flowbite-react";
import { Icon } from "@iconify/react";
import { Link } from "react-router";
import Profile from "./Profile";
import Notification from "./Notification";
import MobileSidebar from "../sidebar/MobileSidebar";
import paths from "src/config/path.config";
import { useAuth } from "src/context/AuthContext";


const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // mobile-sidebar
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  return (
    <>
      <header
        className={`sticky top-0 z-[5] ${isSticky
          ? "bg-white dark:bg-dark fixed w-full"
          : "bg-white"
          }`}
      >
        <Navbar
          fluid
          className={`rounded-none bg-transparent dark:bg-transparent py-4 sm:px-30 px-4`}
        >
          <div className="flex gap-3 items-center justify-between w-full ">
            <div className="flex gap-2 items-center">

              {/* Mobile Toggle Icon */}
              <span
                onClick={() => setIsOpen(true)}
                className="h-10 w-10 flex text-black dark:text-white text-opacity-65 xl:hidden hover:text-primary hover:bg-lightprimary rounded-full justify-center items-center cursor-pointer"
              >
                <Icon icon="solar:hamburger-menu-line-duotone" height={21} />
              </span>
            </div>

            <div className="flex gap-4 items-center">
              {!isAuthenticated ? (
                <>
                  <Button as={Link} to={paths.login} size="sm" color="primary" className="rounded-md py-1 px-3">
                    Đăng nhập
                  </Button>
                  <Button as={Link} to={paths.register} size="sm" color="transparent" className="rounded-md py-1 px-3">
                    Đăng ký
                  </Button>
                </>
              ) : (
                <>
                  <Notification />
                  <Profile />
                </>
              )}
            </div>
          </div>
        </Navbar>
      </header>

      {/* Mobile Sidebar */}
      <Drawer open={isOpen} onClose={handleClose} className="w-130">
        <Drawer.Items>
          <MobileSidebar />
        </Drawer.Items>
      </Drawer>
    </>
  );
};

export default Header;
