import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { tokenUtils } from "../util/tokenUtils";
import { logout, setCredentials } from "../freatuers/auth/authSlice";
import { pagesLinkpath } from "../path/LinkPath";
import { userDataUtils } from "../util/userDataUtils";
import apiClient from "../util/api";

interface AuthGuardProps {
    children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const initializeAuth = async () => {
            try {
                if (tokenUtils.isLoggedIn()) {

                    const userData = userDataUtils.getUserData();

                    if (userData && !isAuthenticated) {
                        // User has valid token but Redux store is empty - restore auth state
                        dispatch(setCredentials({ authData: userData }));
                        
                    } 
                    else if(!userData){
                        try {
                            const response = await apiClient.get('/api/auth/profile')
                            // Store user data in cookies
                            userDataUtils.setUserData(response.data.data);
                            dispatch(setCredentials({ authData: response.data.data }));
                        } catch (error) {
                            console.log(error)
                        }
                    }
                } else {
                    // No valid token found - logout and redirect
                    dispatch(logout());
                    navigate(pagesLinkpath.login, { replace: true });
                }
            } catch (error) {
                console.error('Auth initialization failed:', error);
                dispatch(logout());
                navigate(pagesLinkpath.login, { replace: true });
            } finally {
                setIsLoading(false);
            }
        };
        initializeAuth();
    }, [dispatch, navigate]); // Removed isAuthenticated from dependencies

    // Show loading while checking authentication
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg">Loading...</div>
            </div>
        );
    }

    // Only render children after auth check is complete
    return <>{children}</>;
}