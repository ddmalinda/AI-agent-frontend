import { useSelector } from "react-redux";
import NavBar from "../commen/navbar/NavBar"
import type { RootState } from "../app/store"
import { Navigate } from "react-router-dom";
import { pagesLinkpath } from "../path/LinkPath";

type Props = {}

export default function HomePage({ }: Props) {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const firstName = useSelector((state: RootState) => state.auth.firstName);

  // If not authenticated or no firstName, redirect to login page
  if (!isAuthenticated || !firstName) {
    return <Navigate to={pagesLinkpath.login} replace />;
  }

  return (
    <div>
      <NavBar displayName={firstName} />
    </div>
  )
}