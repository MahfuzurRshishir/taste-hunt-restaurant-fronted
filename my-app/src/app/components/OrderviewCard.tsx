'use client';
import { useState, useEffect } from "react";
import axios from "axios";

type Point = {
    x: number;
    y: number;
    value: number;
    label: string;
};

const ranges = [
    { key: "today", label: "Today" },
    { key: "week", label: "This Week" },
    { key: "month", label: "This Month" },
    { key: "6months", label: "6 Months" },
    { key: "year", label: "This Year" },
];

const chartWidth = 380;
const chartHeight = 160;
const padding = 36;
const yTicks = 5;

const statLabels = [
    { key: "customers", label: "Customers", color: "#2563eb" },
    { key: "products", label: "Products", color: "#10b981" },
    { key: "revenue", label: "Revenue", color: "#f59e42" },
];

const formatStat = (value: number, label: string) => {
    if (label === "customers") return `${value}`;
    if (label === "products") return `${value}`;
    if (label === "revenue") return `${value}`;
    return value;
};

const OverviewCard = () => {
    const [range, setRange] = useState("week");
    const [data, setData] = useState<any>(null);
    const [hovered, setHovered] = useState<{ trend: string; idx: number } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(
                    "http://localhost:3000/orders/dashboard-stats",
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

    if (loading || !data) {
        return (
            <div className="bg-white rounded-2xl shadow-md p-6 w-full h-full flex items-center justify-center">
                Loading...
            </div>
        );
    }

    const current = data[range];
    const { stats, points } = current;
    const maxValue = Math.max(
        ...points.flatMap((p: any) => [p.customers, p.products, p.revenue]),
        1
    );
    const step = (chartWidth - 2 * padding) / (points.length - 1 || 1);

    const getSvgPoints = (key: "customers" | "products" | "revenue"): Point[] =>
        points.map((p: any, i: number): Point => ({
            x: padding + i * step,
            y: padding + (chartHeight - 2 * padding) * (1 - (p[key] / maxValue)),
            value: p[key],
            label: p.label,
        }));

    const trends = [
        { key: "customers", color: "#2563eb" },
        { key: "products", color: "#10b981" },
        { key: "revenue", color: "#f59e42" },
    ];

    const yLabels = Array.from({ length: yTicks }, (_, i) =>
        Math.round((maxValue * (yTicks - 1 - i)) / (yTicks - 1))
    );

    return (
        <div className="bg-white rounded-2xl shadow-md p-6 w-full h-full flex flex-col">
            {/* Stats and filter */}
            <div className="flex items-center justify-between mb-2">
                <div className="flex gap-8">
                    {statLabels.map((s) => (
                        <div key={s.key} className="flex flex-col items-start">
                            <span className="text-lg font-bold text-black">{formatStat(stats[s.key], s.key)}</span>
                            <span className="text-xs text-gray-400">{s.label}</span>
                            <span className="mt-1 block w-6 h-1 rounded-full" style={{ background: s.color }} />
                        </div>
                    ))}
                </div>
                <select
                    className="select select-xs bg-gray-100 rounded-full w-32"
                    value={range}
                    onChange={e => setRange(e.target.value)}
                >
                    {ranges.map(r => (
                        <option key={r.key} value={r.key}>{r.label}</option>
                    ))}
                </select>
            </div>
            {/* Chart */}
            <div className="flex-1 flex flex-col justify-end">
                <div className="relative" style={{ width: chartWidth, height: chartHeight, margin: "0 auto" }}>
                    <svg width={chartWidth} height={chartHeight} className="block" style={{ overflow: "visible" }}>
                        {/* Y axis lines and labels */}
                        {yLabels.map((y, i) => {
                            const yPos = padding + ((chartHeight - 2 * padding) * i) / (yTicks - 1);
                            return (
                                <g key={i}>
                                    <line
                                        x1={padding}
                                        x2={chartWidth - padding}
                                        y1={yPos}
                                        y2={yPos}
                                        stroke="#e5e7eb"
                                        strokeDasharray="2 2"
                                    />
                                    <text
                                        x={padding - 8}
                                        y={yPos + 4}
                                        textAnchor="end"
                                        fontSize={11}
                                        fill="#a3a3a3"
                                    >
                                        {y}
                                    </text>
                                </g>
                            );
                        })}
                        {/* X axis labels */}
                        {points.map((p: any, i: number) => (
                            <text
                                key={i}
                                x={padding + i * step}
                                y={chartHeight - padding + 18}
                                textAnchor="middle"
                                fontSize={12}
                                fill="#a3a3a3"
                            >
                                {p.label}
                            </text>
                        ))}
                        {/* Trends */}
                        {trends.map(trend => {
                            const svgPoints = getSvgPoints(trend.key as "customers" | "products" | "revenue");
                            return (
                                <g key={trend.key}>
                                    <polyline
                                        fill="none"
                                        stroke={trend.color}
                                        strokeWidth={2}
                                        points={svgPoints.map((pt: Point) => `${pt.x},${pt.y}`).join(" ")}
                                    />
                                    {/* Dots and hover */}
                                    {svgPoints.map((pt: Point, i: number) => (
                                        <g key={i}>
                                            <circle
                                                cx={pt.x}
                                                cy={pt.y}
                                                r={hovered?.trend === trend.key && hovered.idx === i ? 6 : 4}
                                                fill={hovered?.trend === trend.key && hovered.idx === i ? trend.color : "#fff"}
                                                stroke={trend.color}
                                                strokeWidth={2}
                                                onMouseEnter={() => setHovered({ trend: trend.key, idx: i })}
                                                onMouseLeave={() => setHovered(null)}
                                                style={{ cursor: "pointer", transition: "r 0.15s" }}
                                            />
                                            {/* Tooltip */}
                                            {hovered?.trend === trend.key && hovered.idx === i && (
                                                <g>
                                                    <rect
                                                        x={pt.x - 28}
                                                        y={pt.y - 38}
                                                        width={56}
                                                        height={24}
                                                        rx={6}
                                                        fill="#222"
                                                        opacity={0.95}
                                                    />
                                                    <text
                                                        x={pt.x}
                                                        y={pt.y - 24}
                                                        textAnchor="middle"
                                                        fill="#fff"
                                                        fontSize="12"
                                                        fontWeight="bold"
                                                    >
                                                        {pt.value}
                                                    </text>
                                                </g>
                                            )}
                                        </g>
                                    ))}
                                </g>
                            );
                        })}
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default OverviewCard;     