type Activity = {
  icon?: React.ReactNode;
  user: string;
  role: string;
  action: string;
  time: string;
};

const activities: Activity[] = [
  {
    user: "Sylvester Quilt",
    role: "Inventory Manager",
    action: 'updated inventory - 10 units of "Organic Chicken Breast"',
    time: "11:20 AM",
  },
  {
    user: "Maria Kings",
    role: "Kitchen Admin",
    action: "marked order #ORD1028 as completed",
    time: "11:00 AM",
  },
  {
    user: "William Smith",
    role: "Receptionist",
    action: "added new reservation for 4 guests at 7:00 PM",
    time: "10:30 AM",
  },
];

const RecentActivityCard = () => (
  <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col gap-2">
    <h2 className="text-lg font-bold mb-2">Recent Activity</h2>
    <div className="flex flex-col gap-4">
      {activities.map((a, i) => (
        <div key={i} className="flex gap-3 items-start">
          <div className="bg-gray-100 rounded-full p-2 mt-1">
            {/* You can replace this with an icon if you want */}
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill="#e5e7eb" />
              <path d="M12 7v5l3 3" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold">{a.user}</span>
              <span className="bg-gray-200 text-xs rounded px-2 py-0.5">{a.role}</span>
            </div>
            <div className="text-sm text-gray-500">{a.action}</div>
            <div className="text-xs text-gray-400 mt-1">{a.time}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default RecentActivityCard;