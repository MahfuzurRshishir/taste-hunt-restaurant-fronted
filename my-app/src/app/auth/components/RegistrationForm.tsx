import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";


const RegistrationForm: React.FC = () => {
    const router = useRouter();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        //console.log('Submitting:', { fullName, email, password }); // Debug log

        // Handle form submission logic here
        const data = {
            email,
            fullName,
            password,
        }
        try {
            const res = await axios.post('http://localhost:3000/auth/register', data)
            //console.log('API response:', res.data); // Debug log
            setMessage('Registration successful! Redirecting...');
            setTimeout(() => {
                router.push('/auth/login');
            }, 1000); // 1 second delay for UX
        } catch (error) {
            //console.error('API error:', error); // Debug log
            setMessage('Registration failed.');
        } finally {
            setLoading(false);
        }
        console.log({ fullName, email, password });
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="fullname">Full Name</label>
                    <input
                        type="text"
                        id="fullname"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
                {message && (
                    <div className="mt-4 text-center text-sm text-green-600">{message}</div>
                )}

            </form>
            <div>
                <div className="flex items-center gap-2">
                    <h4 className="mb-0">Do you already have an account?</h4>
                    <a href="/auth/login" className="text-blue-600 hover:underline">Login</a>
                </div>
            </div>
        </>

    );
};

export default RegistrationForm;