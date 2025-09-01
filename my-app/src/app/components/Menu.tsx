'use client';
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


function getRoleFromToken(token: string | null): string | null {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp && Date.now() / 1000 > payload.exp) {
      return null; // Token expired
    }
    return payload.role || null;
  } catch {
    return null;
  }
}



const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/rolecheck",
        visible: ["staff", "cashier", "chef", "admin"],
      },
      {
        icon: "/order.png",
        label: "Orders",
        href: "/orders/rolecheck",
        visible: ["staff", "cashier", "chef", "admin"],
      },
      {
        icon: "/kitchen.png",
        label: "Kitchen",
        href: "/",
        visible: ["chef", "admin"],
      },
      {
        icon: "/inventory.png",
        label: "inventory",
        href: "/",
        visible: ["admin", "staff"],
      },
      {
        icon: "/schedule.png",
        label: "Schedule",
        href: "/",
        visible: ["admin", "staff", "chef", "cashier"],
      },
      {
        icon: "/message.png",
        label: "Messages",
        href: "/",
        visible: ["admin", "staff", "chef", "cashier"],
      },
      {
        icon: "/table.png",
        label: "Tables",
        href: "/",
        visible: ["admin", "staff", "chef"],
      },
      {
        icon: "/payment.png",
        label: "Payments",
        href: "/",
        visible: ["admin", "staff", "cashier"],
      },
      {
        icon: "/calendar.png",
        label: "Calendar",
        href: "/",
        visible: ["admin", "staff", "chef", "cashier"],
      },
      {
        icon: "/announcement.png",
        label: "Announcements",
        href: "/",
        visible: ["admin", "staff", "chef", "cashier"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
        visible: ["admin", "staff", "chef", "cashier"],
      },
      {
        icon: "/settings.png",
        label: "Settings",
        href: "/settings",
        visible: ["admin", "staff", "chef", "cashier"],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "../auth/logout",
        visible: ["admin", "staff", "chef", "cashier"],
      },
    ],
  },
];

const Menu = () => {

  const [role, setRole] = useState<string | null>(null);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setRole(getRoleFromToken(token));
  }, []);
  //const role = getRoleFromToken(token);
  const role1 = "chef";

  const handleLogout = () => {
    localStorage.removeItem("token");
    setShowLogoutDialog(false);
    router.replace("/auth/login");
  };

  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {i.title}
          </span>
          {i.items.map((item) => {
            if (role1 && item.visible.includes(role1)) {
              if (item.label === "Logout") {
                // Render a button for Logout
                return (
                  <button
                    key={item.label}
                    onClick={() => setShowLogoutDialog(true)}
                    className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:shadow-sm hover:shadow-gray-600 transition-all duration-200 bg-transparent border-0 w-full text-left"
                  >
                    <Image src={item.icon} alt="" width={20} height={20} />
                    <span className="hidden lg:block">{item.label}</span>
                  </button>
                );
              }
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:shadow-sm hover:shadow-gray-600 transition-all duration-200"                >
                  <Image src={item.icon} alt="" width={20} height={20} />

                  <span className="hidden lg:block">{item.label}</span>
                </Link>

              );
            }
          })}
        </div>
      ))}
      {/* Logout Confirmation Dialog */}
      {showLogoutDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm z-50">          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
          <p className="mb-6 text-lg font-semibold text-gray-700">Are you sure you want to logout?</p>
          <div className="flex gap-4">
            <button
              onClick={handleLogout}
              className="btn btn-error px-6"
            >
              Yes, Logout
            </button>
            <button
              onClick={() => setShowLogoutDialog(false)}
              className="btn btn-outline px-6"
            >
              Cancel
            </button>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default Menu;