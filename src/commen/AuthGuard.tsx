import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import { tokenUtils } from "../util/tokenUtils";
import { logout, setCredentials } from "../freatuers/auth/authSlice";
import { pagesLinkpath } from "../path/LinkPath";
import { userDataUtils } from "../util/userDataUtils";

interface AuthGuardProps {
    children: React.ReactNode;
}
export default function AuthGuard({ children }: AuthGuardProps) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);

    useEffect(() => {
        // Check if user has valid token when app loads
        if (tokenUtils.isLoggedIn()) {
            const userData = userDataUtils.getUserData();
            if (userData && !isAuthenticated) {
                // User has token but Redux store is empty - restore auth state
                dispatch(setCredentials({ authData: userData }));
            }
        } else {
            // No token found - logout and redirect to login
            dispatch(logout());
            navigate(pagesLinkpath.login);
        }
    }, [dispatch, navigate, isAuthenticated]);

    // Show loading or login page if not authenticated
    if (!tokenUtils.isLoggedIn() || !isAuthenticated) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
}