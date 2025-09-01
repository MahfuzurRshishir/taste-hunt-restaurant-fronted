'use client';
import { useState, useEffect } from "react";
import axios from "axios";

const ranges = [
    { key: "day", label: "Day" },
    { key: "week", label: "Week" },
    { key: "month", label: "Month" },
    { key: "6month", label: "6 Months" },
    { key: "year", label: "Year" },
];

type OrderData = {
    label: string;
    count: number;
};
type OrderOverviewData = {
    day: OrderData[];
    week: OrderData[];
    month: OrderData[];
    "6month": OrderData[];
    year: OrderData[];
};

const OrderOverviewCard = () => {
    const [range, setRange] = useState<keyof OrderOverviewData>("week");
    const [hovered, setHovered] = useState<number | null>(null);
    const [data, setData] = useState<OrderOverviewData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const token = localStorage.getItem("token");
            try {
                const res = await axios.get<OrderOverviewData>(
                    "http://localhost:3000/orders/quantity-by-time",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setData(res.data);
            } catch (err) {
                setData(null);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const currentData = data ? data[range] : [];

    const maxCount = currentData.length > 0 ? Math.max(...currentData.map(d => d.count)) : 1;

    return (
        <div className="bg-white rounded-2xl shadow-md p-6 w-full h-full flex flex-col">
            <div className="flex items-center justify-between gap-4 mb-6">
                <span className="text-base font-semibold">Orders Overview</span>
                <select
                    className="select select-xs bg-black-100 rounded-full w-32"
                    value={range}
                    onChange={e => setRange(e.target.value as keyof OrderOverviewData)}
                >
                    {ranges.map(r => (
                        <option key={r.key} value={r.key}>{r.label}</option>
                    ))}
                </select>
            </div>
            <div className="flex-1 flex items-end gap-2 pb-4 relative">
                {loading ? (
                    <div className="w-full text-center text-gray-400">Loading...</div>
                ) : currentData.length === 0 ? (
                    <div className="w-full text-center text-gray-400">No data</div>
                ) : (
                    currentData.map((d, idx) => (
                        <div
                            key={d.label}
                            className="flex flex-col items-center flex-1 relative"
                            onMouseEnter={() => setHovered(idx)}
                            onMouseLeave={() => setHovered(null)}
                        >
                            <div
                                className={`
                                    rounded-t-lg transition-all duration-200
                                    ${idx === 3 ? "bg-orange-500" : "bg-orange-100"}
                                    ${hovered === idx ? "shadow-xl" : ""}
                                `}
                                style={{
                                    height: `${(d.count / maxCount) * 120}px`,
                                    width: "80%",
                                    transition: "height 0.3s"
                                }}
                                title={`${d.label}: ${d.count} orders`}
                            />
                            {/* Tooltip */}
                            {hovered === idx && (
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded shadow z-10 pointer-events-none">
                                    {d.count} orders
                                </div>
                            )}
                            <span className="text-xs text-black-400 mt-2">{d.label}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default OrderOverviewCard;