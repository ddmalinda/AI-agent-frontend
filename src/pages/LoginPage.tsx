import { useState } from "react"
import { useDispatch } from "react-redux";
import apiClient from "../util/api";
import { setCredentials } from "../freatuers/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { pagesLinkpath } from "../path/LinkPath";
import LoadingButton from "../commen/componets/buttons/LoadingButton";

type Props = {}

export default function LoginPage({ }: Props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true)
        setError("");

        try {
            const response = await apiClient.post('/api/auth/login', {
                email: username,
                password: password,
                withCredentials: true
            });
            // Dispatch the action with a correctly typed payload
            dispatch(setCredentials({  authData: response.data}));
            // Navigate to home page after successful login
            navigate(pagesLinkpath.homePage);
        } catch (error) {
            console.error('Login failed:', error);
            setLoading(false);
            setError("Login failed. Please check your credentials.");
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-200">
            <form
                className="grid gap-y-4 mx-auto bg-white rounded-2xl shadow py-8 px-10 w-full max-w-sm"
                onSubmit={handleSubmit}
                autoComplete="off"
            >
                <div className="mx-auto">
                     <img src="/logo.png" alt="Logo" className="rounded-2xl shadow-2xl" />
                </div>
                <h2 className="text-2xl font-bold text-center mb-2 font-poppins">Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    className="bg-black text-white rounded-2xl h-10  font-poppins placeholder-white/40 text-center"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="bg-black text-white rounded-2xl h-10  font-poppins placeholder-white/40 text-center"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onContextMenu={e => e.preventDefault()}
                />
                {error && (
                    <div className="text-red-600 text-center text-sm font-poppins">{error}</div>
                )}
                <LoadingButton loading={loading} before="LogIn" after="Logging in..."/>
                <div className="flex justify-center">
                    Don't have you account?
                    <Link to={pagesLinkpath.singIn} className="ml-1 hover:underline">
                    Sign up
                    </Link>
                </div>
            </form>

        </div>
    )
}