'use client';
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const icons = [
  { src: "/totalorder.png", alt: "Total Orders Icon" },
  { src: "/totalcustomer.png", alt: "Total Customers Icon" },
  { src: "/totalrevenue.png", alt: "Total Revenue Icon" },
  { src: "/assingedtask.png", alt: "Assigned Tasks Icon" },
  { src: "/completedtask.png", alt: "Completed Tasks Icon" },
  { src: "/pendingtask.png", alt: "Pending Tasks Icon" },
];

type UserCardProps = {
  type: "Total Orders" | "Total Customers" | "Total Revenue";
};

const keyMap: Record<UserCardProps["type"], keyof SummaryData> = {
  "Total Orders": "totalOrders",
  "Total Customers": "totalCustomers",
  "Total Revenue": "totalRevenue",
};

type SummaryData = {
  totalOrders: number;
  totalCustomers: number;
  totalRevenue: number;
};

const UserCard = ({ type }: UserCardProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get<SummaryData>(
          "http://localhost:3000/orders/summary",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setValue(res.data[keyMap[type]]);
      } catch {
        setValue(null);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, [type]);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="rounded-3xl py-2 px-4 flex-1 min-w-[130px] shadow-md bg-gray-100 dark:bg-gray-800">
      <div className="flex p-4 gap-4 items-left">
        <div className="w-[20%] flex items-center">
          <Image
            src={
              icons.find(icon =>
                icon.alt.toLowerCase().includes(type.toLowerCase())
              )?.src || "/defaulticon.png"
            }
            alt={
              icons.find(icon =>
                icon.alt.toLowerCase().includes(type.toLowerCase())
              )?.alt || "Default Icon"
            }
            width={100}
            height={100}
          />
        </div>
        <div className="w-[80%]">
          <div className="flex justify-between items-center relative" ref={dropdownRef}>
            <h3 className="capitalize text-md font-medium text-black-500">{type}</h3>
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="focus:outline-none"
              type="button"
            >
              <Image src="/moreblack.png" alt="More Options" width={24} height={24} />
            </button>
            {open && (
              <div className="absolute right-0 top-8 bg-white dark:bg-gray-700 shadow-lg rounded-md z-10 min-w-[100px]">
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">Day</li>
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">Month</li>
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">Year</li>
                </ul>
              </div>
            )}
          </div>
          <h1 className="text-2xl font-semibold my-4">
            {loading ? "Loading..." : value !== null ? value.toLocaleString() : "N/A"}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default UserCard;