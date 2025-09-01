'use client';
import RegistrationForm from '../components/RegistrationForm';
import TopNavbar from '../components/topNavBar';

const Register = () => {
    return (
        <>
        <TopNavbar/>
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
            <div className="w-full max-w-md bg-white/90 rounded-2xl shadow-2xl px-10 py-12 flex flex-col gap-8">
                <h2 className="text-3xl font-extrabold text-center text-purple-700 mb-2 tracking-wide">Register</h2>
                <RegistrationForm />
            </div>
        </div>
        </>
    );
};

export default Register;