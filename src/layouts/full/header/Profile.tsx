
import { Button, Dropdown } from "flowbite-react";
import { Icon } from "@iconify/react";
import user1 from "/src/assets/images/profile/user-1.jpg";
import { Link } from "react-router";
import { useAuth } from "src/context/AuthContext";

const Profile = () => {
  const { logout } = useAuth();
  return (
    <div className="relative group/menu">
      <Dropdown
        label=""
        className="rounded-sm w-44"
        dismissOnClick={false}
        renderTrigger={() => (
          <span className="h-10 w-10 hover:text-primary hover:bg-lightprimary dark:hover:bg-gray-700 rounded-full flex justify-center items-center cursor-pointer group-hover/menu:bg-lightprimary group-hover/menu:text-primary dark:group-hover/menu:bg-gray-700">
            <img
              src={user1}
              alt="logo"
              height="35"
              width="35"
              className="rounded-full"
            />
          </span>
        )}
      >

        {/* Profile */}
        <Dropdown.Item
          as={Link}
          to="#"
          className="px-3 py-3 flex items-center bg-hover group/link w-full gap-3 text-dark dark:text-white"
        >
          <Icon icon="solar:user-circle-outline" height={20} />
          My Profile
        </Dropdown.Item>

        {/* Settings */}
        <Dropdown.Item
          as={Link}
          to="#"
          className="px-3 py-3 flex items-center bg-hover group/link w-full gap-3 text-dark dark:text-white"
        >
          <Icon icon="solar:settings-linear" height={20} />
          Setting
        </Dropdown.Item>
        <Dropdown.Item
          as={Link}
          to="#"
          className="px-3 py-3 flex items-center bg-hover group/link w-full gap-3 text-dark dark:text-white"
        >
          <Icon icon="solar:checklist-linear" height={20} />
          My Task
        </Dropdown.Item>
        <div className="p-3 pt-0">
          <Button
            size="sm"
            className="mt-2 border border-primary text-primary bg-transparent hover:bg-lightprimary outline-none focus:outline-none w-full"
            onClick={logout}
          >
            <Icon icon="solar:logout-2-outline" height={20} />
            Logout
          </Button>
        </div>
      </Dropdown>
    </div>
  );
};

export default Profile;
