import Cookies from 'js-cookie';

export const userDataUtils = {
    // Save token when user logs in
    setUserData: (userData: string) => {
        // Save token in cookies (expires in 7 days)
        Cookies.set('authData', JSON.stringify(userData));
    },

    // Get token from cookies
    getUserData: (): any | null => {
       const authData = Cookies.get('authData');
    return authData ? JSON.parse(authData) : null;
    },

    // Remove token and user data (logout)
    removeUserData: () => {
        Cookies.remove('authData');
    },

};