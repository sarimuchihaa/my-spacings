import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout.js";

const LogoutButton = () => {
	const { loading, logout } = useLogout();

	return( 
	  <div className='mt-auto'>
		{!loading ? (
		<BiLogOut className='w-16 h-8 mt-5 text-white cursor-pointer' onClick={logout}/>
		) : (
			<span className="loading loading-spinner"></span>
		)}
	</div>
	)
};
export default LogoutButton;