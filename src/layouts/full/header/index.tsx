
import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { Button, Navbar, Drawer, Modal } from "flowbite-react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import paths from "src/config/path.config";
import { useAuth } from "src/context/AuthContext";
import MobileSidebar from "../sidebar/MobileSidebar";
import SearchDropdown from "./SearchDropdown";
import Language from "./Language";
import Profile from "./Profile";
import Notification from "./Notification";
import ToggleThemeButton from "./ToggleThemeButton";


const Header = () => {
  const { t } = useTranslation();
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
                className="h-10 w-10 flex text-opacity-65 xl:hidden hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full justify-center items-center cursor-pointer transition group"
              >
                <Icon icon="solar:hamburger-menu-line-duotone" height={22} className="text-gray-400 group-hover:text-primary transition-colors" />
              </span>

              {/* Search (Desktop) */}
              <div className="hidden md:block">
                <SearchDropdown />
              </div>

              {/* Search Icon (Mobile) */}
              <button
                className="block md:hidden ml-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition group"
                onClick={() => setShowSearchModal(true)}
                aria-label="Tìm kiếm"
              >
                <Icon icon="solar:magnifer-linear" height={22} className="text-gray-400 group-hover:text-primary transition-colors" />
              </button>

            </div>

            <div className="flex gap-4 items-center">
              {/* Toggle Mode */}
              <ToggleThemeButton />

              {/* Language Switcher */}
              <Language />

              {/* Auth & Profile */}
              {!isAuthenticated ? (
                <>
                  {/* Auth (Desktop) */}
                  <div className="hidden sm:flex items-center space-x-1 lg:space-x-2">
                    <Button as={Link} to={paths.login} size="sm" color="primary" className="rounded-md py-1 px-3">
                      {t('login')}
                    </Button>
                    <Button as={Link} to={paths.register} size="sm" color="transparent" className="rounded-md py-1 px-3">
                      {t('register')}
                    </Button>
                  </div>
                  <div className="sm:hidden">
                    <Link
                      to={paths.login}
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center justify-center group"
                    >
                      <Icon
                        icon="solar:user-circle-linear"
                        height={22}
                        className="text-gray-400 group-hover:text-primary transition-colors"
                      />
                    </Link>
                  </div>

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
        popup
      >
        <Modal.Header className="px-6 pb-4">Search</Modal.Header>
        <Modal.Body>
          <div className="mt-1 space-y-6">
            <SearchDropdown isModalOpen={showSearchModal} onClose={() => setShowSearchModal(false)} />
          </div>
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
