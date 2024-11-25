import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout.js";

const LogoutButton = () => {
  const { logout } = useLogout();

  return (
    <div className="flex flex-col h-full">
      <div className="mt-auto">
        <BiLogOut
          className="w-10 h-10 text-black cursor-pointer"
          onClick={logout}
        />
      </div>
    </div>
  );
};

export default LogoutButton;
