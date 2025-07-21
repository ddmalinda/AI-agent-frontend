import { useState } from "react"
import LoadingButton from "../commen/componets/buttons/LoadingButton";
import apiClient from "../util/api";

import { pagesLinkpath } from "../path/LinkPath";
import { useNavigate } from "react-router-dom";

type Props = {}

export default function SingIn({ }: Props) {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!firstName || !lastName || !email || !password) {
            setError("All files are requied");
            return;
        }
        if (password !== verifyPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);
        setError("");

        try {
            await apiClient.post('/api/auth/register', {
                firstName,
                lastName,
                email,
                password
            });

            navigate(pagesLinkpath.login);
        } catch (e: any) {
            console.error("Registration failed", e)
            setError(e.response?.data?.message || "Rsgistration Failed.Please try again ");
        } finally {
            setLoading(false);
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
                </div>
                <h2 className="text-2xl font-bold text-center mb-2 font-poppins">Sign In</h2>
                <input
                    type="text"
                    placeholder="First Name"
                    className="bg-black text-white rounded-2xl h-10  font-poppins placeholder-white/40 text-center"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    className="bg-black text-white rounded-2xl h-10  font-poppins placeholder-white/40 text-center"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="bg-black text-white rounded-2xl h-10  font-poppins placeholder-white/40 text-center"
                    value={email}
                    onChange={e => setemail(e.target.value)}
                    onContextMenu={e => e.preventDefault()}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="bg-black text-white rounded-2xl h-10  font-poppins placeholder-white/40 text-center"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onContextMenu={e => e.preventDefault()}
                />
                <input
                    type="password"
                    placeholder="Conform Password"
                    className="bg-black text-white rounded-2xl h-10  font-poppins placeholder-white/40 text-center"
                    value={verifyPassword}
                    onChange={e => setVerifyPassword(e.target.value)}
                    onContextMenu={e => e.preventDefault()}
                />
                {error && (
                    <div className="text-red-600 text-center text-sm font-poppins">{error}</div>
                )}
                <LoadingButton loading={loading} after="Account Creating" before="Create Account" />
            </form>
        </div>
    )
}