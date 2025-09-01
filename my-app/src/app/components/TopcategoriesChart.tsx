'use client';
import { useState, useEffect, useMemo } from "react";
import axios from "axios";

type CategoryData = {
    label: string;
    value: number;
    color?: string;
};
type TopCategoriesData = {
    today: CategoryData[];
    week: CategoryData[];
    month: CategoryData[];
    "6months": CategoryData[];
    year: CategoryData[];
};

const donutSize = 200;
const donutWidth = 36;
const radius = (donutSize - donutWidth) / 2;
const center = donutSize / 2;

function getArcPath(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
    const start = {
        x: cx + r * Math.cos((Math.PI * startAngle) / 180),
        y: cy + r * Math.sin((Math.PI * startAngle) / 180),
    };
    const end = {
        x: cx + r * Math.cos((Math.PI * endAngle) / 180),
        y: cy + r * Math.sin((Math.PI * endAngle) / 180),
    };
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
    return [
        `M ${start.x} ${start.y}`,
        `A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
        `L ${cx} ${cy}`,
        "Z",
    ].join(" ");
}

const ranges = [
    { key: "today", label: "Today" },
    { key: "week", label: "This Week" },
    { key: "month", label: "This Month" },
    { key: "6months", label: "6 Months" },
    { key: "year", label: "This Year" },
];

// Default color palette
const defaultColors = ["#222", "#FFDAB9", "#FF9900", "#FFF5E1", "#8EC5FC", "#E0C3FC", "#FFB6B9", "#B5FFFC"];

const TopCategoriesChart = () => {
    const [range, setRange] = useState<keyof TopCategoriesData>("week");
    const [hovered, setHovered] = useState<number | null>(null);
    const [data, setData] = useState<TopCategoriesData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const token = localStorage.getItem("token");
            try {
                const res = await axios.get<TopCategoriesData>(
                    "http://localhost:3000/orders/top-items-by-time",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setData(res.data);
            } catch {
                setData(null);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Assign colors to categories for the current range
    const chartData: CategoryData[] = useMemo(() => {
        if (!data) return [];
        return data[range].map((d, i) => ({
            ...d,
            color: defaultColors[i % defaultColors.length],
        }));
    }, [data, range]);

    const total = chartData.reduce((sum, d) => sum + d.value, 0);

    let cumulative = 0;

    return (
        <div className="flex flex-col items-center justify-center h-full w-full">
            <div className="flex items-center justify-between w-full mb-1 mt-4 px-4">
                <span className="text-md font-semibold text-gray-800">Top Categories</span>
                <select
                    className="select select-xs bg-gray-100 rounded-full w-32"
                    value={range}
                    onChange={e => setRange(e.target.value as keyof TopCategoriesData)}
                >
                    {ranges.map(r => (
                        <option key={r.key} value={r.key}>{r.label}</option>
                    ))}
                </select>
            </div>
            <div className="relative flex items-center justify-center" style={{ width: donutSize, height: donutSize }}>
                {loading ? (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">Loading...</div>
                ) : chartData.length === 0 ? (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">No data</div>
                ) : (
                    <svg width={donutSize} height={donutSize} viewBox={`0 0 ${donutSize} ${donutSize}`}>
                        {chartData.map((d, i) => {
                            const startAngle = (cumulative / total) * 360 - 90;
                            const endAngle = ((cumulative + d.value) / total) * 360 - 90;
                            const path = getArcPath(center, center, radius, startAngle, endAngle);
                            const isHovered = hovered === i;
                            cumulative += d.value;
                            return (
                                <path
                                    key={d.label}
                                    d={path}
                                    fill={d.color}
                                    opacity={isHovered || hovered === null ? 1 : 0.5}
                                    filter={isHovered ? "drop-shadow(0px 0px 8px #aaa)" : ""}
                                    onMouseEnter={() => setHovered(i)}
                                    onMouseLeave={() => setHovered(null)}
                                    style={{ cursor: "pointer", transition: "opacity 0.2s, filter 0.2s" }}
                                />
                            );
                        })}
                        {/* Donut hole */}
                        <circle cx={center} cy={center} r={radius - donutWidth / 2} fill="#fff" />
                    </svg>
                )}
                {/* Value in center */}
                {!loading && chartData.length > 0 && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                        <span className="text-2xl font-bold">
                            {hovered !== null ? chartData[hovered].value : total}
                        </span>
                        <span className="text-sm text-gray-400">
                            {hovered !== null ? chartData[hovered].label : "Total"}
                        </span>
                    </div>
                )}
            </div>
            {/* Legend */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 -mt-2 text-sm">
                {chartData.map((d, i) => (
                    <div key={d.label} className="flex items-center gap-2">
                        <span className="inline-block w-4 h-4 rounded-sm" style={{ background: d.color }}></span>
                        <span className="font-semibold">{d.label}</span>
                        <span className="ml-auto">{d.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopCategoriesChart;