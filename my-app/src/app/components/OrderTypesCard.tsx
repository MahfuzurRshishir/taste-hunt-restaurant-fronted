'use client';
import Image from "next/image";
import { useState } from "react";

const dummyData = {
  today: [
    { icon: "/dinein.png", label: "Dine-In", percent: 50, count: 20 },
    { icon: "/takeaway.png", label: "Take Way", percent: 30, count: 12 },
    { icon: "/online.png", label: "Online", percent: 20, count: 8 },
  ],
  week: [
    { icon: "/dinein.png", label: "Dine-In", percent: 45, count: 110 },
    { icon: "/takeaway.png", label: "Take Way", percent: 25, count: 70 },
    { icon: "/online.png", label: "Online", percent: 30, count: 80 },
  ],
  month: [
    { icon: "/dinein.png", label: "Dine-In", percent: 40, count: 400 },
    { icon: "/takeaway.png", label: "Take Way", percent: 30, count: 300 },
    { icon: "/online.png", label: "Online", percent: 30, count: 300 },
  ],
  "6months": [
    { icon: "/dinein.png", label: "Dine-In", percent: 38, count: 1200 },
    { icon: "/takeaway.png", label: "Take Way", percent: 32, count: 1000 },
    { icon: "/online.png", label: "Online", percent: 30, count: 950 },
  ],
  year: [
    { icon: "/dinein.png", label: "Dine-In", percent: 35, count: 2200 },
    { icon: "/takeaway.png", label: "Take Way", percent: 33, count: 2100 },
    { icon: "/online.png", label: "Online", percent: 32, count: 2000 },
  ],
};

const ranges = [
  { key: "today", label: "Today" },
  { key: "week", label: "This Week" },
  { key: "month", label: "This Month" },
  { key: "6months", label: "6 Months" },
  { key: "year", label: "This Year" },
];

const OrderTypesCard = () => {
  const [range, setRange] = useState<keyof typeof dummyData>("week");
  const orderTypes = dummyData[range];

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 w-full h-full max-w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-gray-700">Order Types</span>
        <select
          className="select select-xs bg-gray-100 rounded-full w-32"
          value={range}
          onChange={e => setRange(e.target.value as keyof typeof dummyData)}
        >
          {ranges.map(r => (
            <option key={r.key} value={r.key}>{r.label}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2 mt-2 h-[220px]">
        {orderTypes.map((type) => (
          <div key={type.label} className="flex items-center justify-between flex-1">
            <div className="flex items-center gap-2 h-full">
              <Image src={type.icon} alt={type.label} width={32} height={32} />
              <span className="font-semibold">
                {type.label} <span className="text-gray-500">{type.percent}%</span>
              </span>
            </div>
            <span className="font-mono text-base">{type.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTypesCard;