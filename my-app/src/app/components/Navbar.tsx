'use client';
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// Optional: If you use next-themes for DaisyUI theme switching
import { useTheme } from "next-themes";

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

const Navbar = () => {
    const [user, setUser] = useState({ fullname: "User", role: "User", mypath: "" });
    const [avatar, setAvatar] = useState<string | null>(null);
    const [unreadMessages, setUnreadMessages] = useState(0);
    const [unreadAnnouncements, setUnreadAnnouncements] = useState(0);

    const { theme, setTheme } = useTheme();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userObj = getUserFromToken(token);
        setUser(userObj);

        // Use mypath from token for avatar
        if (userObj.mypath) {
            const url = userObj.mypath.startsWith("/")
                ? `http://localhost:3000${userObj.mypath}`
                : userObj.mypath;
            setAvatar(url);
        } else {
            setAvatar(null);
        }

        setUnreadMessages(1);
        setUnreadAnnouncements(5);
    }, []);

    return (
        <div className='flex items-center justify-between p-4'>
            {/* SEARCH BAR */}
            <div className='hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2'>
                <Image src="/search.png" alt="" width={14} height={14} />
                <input type="text" placeholder="Search..." className="w-[350px] p-2 bg-transparent outline-none" />
            </div>
            {/* ICONS AND USER */}
            <div className='flex items-center gap-6 justify-end w-full px-12'>
                {/* THEME SWITCHER (DaisyUI) */}
                <button
                    className="btn btn-ghost btn-circle"
                    aria-label="Toggle Theme"
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                    {theme === "dark" ? (
                        // Sun icon for dark mode
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-8.66l-.71.71M4.05 4.05l-.71.71M21 12h-1M4 12H3m16.95 7.05l-.71-.71M4.05 19.95l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    ) : (
                        // Moon icon for light mode
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
                        </svg>
                    )}
                </button>
                {/* MESSAGE ICON */}
                <Link href="/messages" className='bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative'>
                    <Image src="/message.png" alt="" width={20} height={20} />
                    {unreadMessages > 0 && (
                        <div className='absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs'>
                            {unreadMessages}
                        </div>
                    )}
                </Link>
                {/* ANNOUNCEMENT ICON */}
                <Link href="/announcements" className='bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative'>
                    <Image src="/announcement.png" alt="" width={20} height={20} />
                    {unreadAnnouncements > 0 && (
                        <div className='absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs'>
                            {unreadAnnouncements}
                        </div>
                    )}
                </Link>
                {/* USER INFO */}
                <div className='flex flex-col '>
                    <span className="text-md leading-3 font-medium">{user.fullname}</span>
                    <span className="text-xs text-gray-500 text-right">{user.role}</span>
                </div>
                <Image
                    src={avatar ? avatar : "/avatar.png"}
                    alt=""
                    width={64}
                    height={64}
                    className="rounded-full"
                    unoptimized
                />
            </div>
        </div>
    );
};
export default Navbar;