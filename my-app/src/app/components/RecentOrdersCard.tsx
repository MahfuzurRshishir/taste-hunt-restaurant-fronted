import Image from "next/image";

const orders = [
  {
    id: "ORD1025",
    photo: "/sushi.jpeg",
    menu: "Salmon Sushi Roll",
    subtitle: "Seafood",
    qty: 3,
    amount: 30,
    customer: "Dana White",
    status: "On Process",
    statusColor: "bg-yellow-200 text-yellow-800",
  },
  {
    id: "ORD1026",
    photo: "/spaghetti.jpeg",
    menu: "Spaghetti Carbonara",
    subtitle: "Pasta",
    qty: 1,
    amount: 15,
    customer: "Eve Carter",
    status: "Cancelled",
    statusColor: "bg-gray-400 text-white",
  },
  {
    id: "ORD1027",
    photo: "/burger.jpeg",
    menu: "Classic Cheeseburger",
    subtitle: "Burger",
    qty: 1,
    amount: 10,
    customer: "Charlie Brown",
    status: "Completed",
    statusColor: "bg-orange-500 text-white",
  },
];

const RecentOrdersCard = () => (
  <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-full">
    <div className="flex items-center justify-between mb-4">
      <span className="text-lg font-semibold">Recent Orders</span>
      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="Search placeholder"
          className="input input-sm input-bordered rounded-full max-w-xs"
        />
        <span className="btn btn-sm rounded-full bg-gray-100 text-gray-700 border-none">This Week</span>
        <button className="btn btn-sm rounded-full bg-gray-200 text-gray-700 border-none">See All Orders</button>
      </div>
    </div>
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr className="text-gray-400 text-xs">
            <th>Order ID</th>
            <th>Photo</th>
            <th>Menu</th>
            <th>Qty</th>
            <th>Amount</th>
            <th>Customer</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="text-sm">
              <td className="font-semibold">{o.id}</td>
              <td>
                <div className="w-12 h-12 rounded-xl overflow-hidden">
                  <Image src={o.photo} alt={o.menu} width={48} height={48} className="object-cover w-full h-full" />
                </div>
              </td>
              <td>
                <div>
                  <div className="font-semibold">{o.menu}</div>
                  <div className="text-xs text-gray-400">{o.subtitle}</div>
                </div>
              </td>
              <td>{o.qty}</td>
              <td className="text-orange-500 font-semibold">${o.amount.toFixed(2)}</td>
              <td>{o.customer}</td>
              <td>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${o.statusColor}`}>
                  {o.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default RecentOrdersCard;