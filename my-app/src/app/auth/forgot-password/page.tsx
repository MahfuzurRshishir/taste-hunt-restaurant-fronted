"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

type ForgotPasswordResponse = {
  message: string;
  token: string;
  otp: number;
};

const ForgotPasswordPage: React.FC = () => {
    const [step, setStep] = useState<"email" | "reset">("email");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [token, setToken] = useState(""); // store the reset token here
    const [error, setError] = useState("");
    const [info, setInfo] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Step 1: Submit email
    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setInfo("");
        setLoading(true);
        try {
            const res = await axios.post<ForgotPasswordResponse>(
                "http://localhost:3000/auth/forgot-password",
                { email }
            );
            setToken(res.data.token);
            setStep("reset");
            setInfo("A 6-digit verification code has been sent to your email.");
        } catch (err: any) {
            setError(
                err.response?.data?.message === "User not found"
                    ? "User not found"
                    : "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    // Step 2: Submit code and new password
    const handleResetSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setInfo("");
        setLoading(true);

        const otpNumber = Number(otp);


        try {
            await axios.post(
                "http://localhost:3000/auth/reset-password",
                {
                    newPassword,
                    otp: otpNumber,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setInfo("Password changed! Redirecting to login...");
            setTimeout(() => router.replace("/auth/login"), 500);
        } catch (err: any) {
            alert("Error: " + err);
            setError(
                err.response?.data?.message === "Invalid code"
                    ? "Wrong verification code"
                    : "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
            <form
                onSubmit={step === "email" ? handleEmailSubmit : handleResetSubmit}
                className="w-full max-w-md bg-white/90 rounded-2xl shadow-2xl px-10 py-12 flex flex-col gap-4 relative"
            >
                {/* Back Button */}
                <button
                    type="button"
                    onClick={() => {
                        if (step === "email") {
                            router.back();
                        } else {
                            setStep("email");
                            setOtp("");
                            setNewPassword("");
                            setError("");
                            setInfo("");
                        }
                    }}
                    className="absolute left-4 top-4 text-blue-600 hover:underline text-sm"
                >
                    &larr; Back
                </button>
                <h2 className="text-2xl font-bold text-center text-purple-700 mb-4">
                    Forgot Password
                </h2>
                {step === "email" && (
                    <>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                            Enter your email address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="input input-bordered w-full"
                            required
                        />
                        <button
                            type="submit"
                            className="btn btn-primary w-full mt-2"
                            disabled={loading}
                        >
                            {loading ? "Checking..." : "Send Code"}
                        </button>
                        {error === "User not found" && (
                            <div className="mt-4 text-center text-sm text-red-600">
                                User not found.<br />
                                <Link href="/auth/register" className="text-blue-600 underline">Not have an account? Register</Link>
                            </div>
                        )}
                    </>
                )}
                {step === "reset" && (
                    <>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="code">
                            Enter the 6-digit code sent to your email
                        </label>
                        <input
                            type="number"
                            id="code"
                            value={otp}
                            onChange={e => setOtp(e.target.value)}
                            className="input input-bordered w-full"
                            required
                            maxLength={6}
                            pattern="\d{6}"
                            inputMode="numeric"
                        />
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="newPassword">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                            className="input input-bordered w-full"
                            required
                            minLength={6}
                        />
                        <button
                            type="submit"
                            className="btn btn-primary w-full mt-2"
                            disabled={loading}
                        >
                            {loading ? "Resetting..." : "Reset Password"}
                        </button>
                        {error && (
                            <div className="mt-4 text-center text-sm text-red-600">
                                {error}
                            </div>
                        )}
                    </>
                )}
                {info && (
                    <div className="mt-4 text-center text-sm text-green-600">
                        {info}
                    </div>
                )}
            </form>
        </div>
    );
};

export default ForgotPasswordPage;