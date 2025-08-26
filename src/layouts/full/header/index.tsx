
import { useState, useEffect } from "react";
import { Button, Navbar, Drawer, Modal } from "flowbite-react";
import { Icon } from "@iconify/react";
import { Link } from "react-router";
import Profile from "./Profile";
import Notification from "./Notification";
import ToggleThemeButton from "./ToggleThemeButton";
import MobileSidebar from "../sidebar/MobileSidebar";
import paths from "src/config/path.config";
import { useAuth } from "src/context/AuthContext";
import SearchDropdown from "./SearchDropdown";


const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const { isAuthenticated } = useAuth();
  // mobile-sidebar
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  // search-modal
  const [showSearchModal, setShowSearchModal] = useState(false);

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

  return (
    <>
      <header
        className={`sticky top-0 z-[5] ${isSticky
          ? "bg-white dark:bg-darkgray fixed w-full"
          : "bg-white"
          }`}
      >
        <Navbar
          fluid
          className={`rounded-none bg-transparent dark:bg-darkgray py-4 sm:px-30 px-4`}
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

              {/* Search (PC) */}
              <div className="hidden md:block">
                <SearchDropdown />
              </div>

              {/* Search Icon (Mobile) */}
              <button
                className="block md:hidden ml-2 p-2 rounded-full hover:bg-gray-100"
                onClick={() => setShowSearchModal(true)}
                aria-label="Tìm kiếm"
              >
                <Icon icon="solar:magnifer-linear" height={22} />
              </button>

            </div>

            <div className="flex gap-4 items-center">
              {/* Toggle Mode */}
              <ToggleThemeButton />

              {/* Auth & Profile */}
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

      {/* Modal Search Mobile */}
      <Modal
        show={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        size="xl"
        popup
      >
        <Modal.Header>Search</Modal.Header>
        <Modal.Body>
          <SearchDropdown isModalOpen={showSearchModal} onClose={() => setShowSearchModal(false)} />
        </Modal.Body>
      </Modal>

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
