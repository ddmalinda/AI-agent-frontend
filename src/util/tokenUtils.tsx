import Cookies from 'js-cookie';

export const tokenUtils = {
    // Save token when user logs in
    setToken: (token: string) => {
        // Save token in cookies (expires in 7 days)
        Cookies.set('token', token, {
            expires: 7,
            secure: false,
            httpOnly: false,
            sameSite: 'strict'
        });
    },

    // Get token from cookies
    getToken: (): string | null => {
        return Cookies.get('token') || null;
    },

    // Remove token and user data (logout)
    removeToken: () => {
        Cookies.remove('token');
    },

    // Check if user is logged in
    isLoggedIn: (): boolean => {
        const token = Cookies.get('token');
        return !!token;
    }
};