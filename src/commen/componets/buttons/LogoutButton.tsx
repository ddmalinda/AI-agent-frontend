import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logout } from "../../../freatuers/auth/authSlice";
import { pagesLinkpath } from "../../../path/LinkPath";

type Props = {}

export default function LogoutButton({}: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout=()=>{
    const confirmLogout = window.confirm("Are you sure you want to logout?");
      if(confirmLogout){
      dispatch(logout())
      navigate(pagesLinkpath.login)
    }
  }

  return (
    <button 
    onClick={handleLogout}
    className="p-2 p bg-red-300 text-gray-700 rounded-full hover:bg-red-400"
    >
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#00000"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
    </button>
  )
}