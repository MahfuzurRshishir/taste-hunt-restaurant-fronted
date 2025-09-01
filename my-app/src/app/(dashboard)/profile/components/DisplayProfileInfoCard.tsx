"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

function getExperience(createdAt: string) {
    if (!createdAt) return { join: "N/A", exp: "No experience info" };
    const created = new Date(createdAt);
    const now = new Date();

    // Format joining date
    const join = created.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    // Calculate years, months, days
    let years = now.getFullYear() - created.getFullYear();
    let months = now.getMonth() - created.getMonth();
    let days = now.getDate() - created.getDate();

    if (days < 0) {
        months--;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }

    let exp = "";
    if (years > 0) exp += `${years} year${years > 1 ? "s" : ""} `;
    if (months > 0) exp += `${months} month${months > 1 ? "s" : ""} `;
    if (days > 0) exp += `${days} day${days > 1 ? "s" : ""}`;
    if (!exp) exp = "Joined this month";

    return { join, exp: exp.trim() };
}

function getUserFromToken(token: string | null) {
    if (!token) return { fullname: "User", role: "User", mypath: "" };
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return {
            fullname: payload.fullname || "User",
            role: payload.role || "User",
            mypath: payload.path || ""
        };
    } catch {
        return { fullname: "User", role: "User", mypath: "" };
    }
}

export default function DisplayProfileInfoCard() {
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

    // Fetch profile info from API
    async function fetchProfile() {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");
        const res = await fetch("http://localhost:3000/profile", {
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch profile");
        return res.json();
    }

    // Use the same logic as Navbar to get avatar from mypath
    function getAvatarUrlFromToken() {
        const token = localStorage.getItem("token");
        const userObj = getUserFromToken(token);
        if (userObj.mypath) {
            return userObj.mypath.startsWith("/")
                ? `http://localhost:3000${userObj.mypath}`
                : userObj.mypath;
        }
        return null;
    }

    // Upload profile picture
    async function uploadProfilePic(file: File) {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("http://localhost:3000/profile/upload-picture", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });
        if (!res.ok) throw new Error("Failed to upload profile picture");
        return res.json();
    }

    useEffect(() => {
        let revokeUrl: string | null = null;
        fetchProfile()
            .then((data) => {
                setProfile(data);
                setLoading(false);
                // Use the same logic as Navbar for avatar
                const url = getAvatarUrlFromToken();
                setAvatarUrl(url);
            })
            .catch(() => {
                setProfile(null);
                setLoading(false);
            });
        return () => {
            if (revokeUrl) URL.revokeObjectURL(revokeUrl);
        };
    }, []);

    const handleProfilePicChange = async (file: File) => {
        try {
            await uploadProfilePic(file);
            // Refetch profile to get updated mypath
            const updatedProfile = await fetchProfile();
            setProfile(updatedProfile);
            // Get new avatar URL and add cache-busting param
            const url = getAvatarUrlFromToken();
            setAvatarUrl(url ? `${url}?t=${Date.now()}` : null);
            alert("Profile picture updated!");
        } catch (error) {
            console.error("Error uploading profile picture:", error);
            alert("Failed to upload profile picture.");
        }
    };

    if (loading) return <div className="p-8">Loading...</div>;

    // Show a fallback UI if profile is not loaded, but don't show error if just missing fields
    if (!profile) {
        return (
            <div className="p-8 text-red-500">
                No profile data found. Please make sure you are logged in and your profile exists.
            </div>
        );
    }

    const { join, exp } = getExperience(profile.createdAt);

    return (
        <div className="bg-base-100 rounded-3xl shadow-md p-8 flex flex-col md:flex-row items-center gap-8">
            {/* Left: Profile Picture & Upload */}
            <div className="flex flex-col items-center">
                <div className="w-40 h-40 rounded-full overflow-hidden mb-4 border-4 border-gray-300">
                    <Image
                        src={avatarUrl || "/avatar.png"}
                        alt="Profile"
                        width={160}
                        height={160}
                        className="object-cover w-full h-full"
                    />
                </div>
                <label className="btn btn-sm btn-outline">
                    Upload Image
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) handleProfilePicChange(e.target.files[0]);
                        }}
                    />
                </label>
            </div>
            {/* Right: Info */}
            <div className="flex-1 flex flex-col items-start justify-center gap-2">
                <div className="font-bold text-2xl">{profile.fullName}</div>
                <div className="text-xs text-gray-500 mb-1">ID: {profile.id}</div>
                <div className="text-sm text-gray-700">Joining date: {join}</div>
                <div className="text-sm text-gray-700">Experience: {exp}</div>
                <div className="font-bold text-lg uppercase mt-2">{profile.role}</div>
            </div>
        </div>
    );
}