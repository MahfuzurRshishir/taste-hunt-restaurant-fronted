const activeOrders = [
  { id: "ORD1030", menu: "Grilled Salmon", table: 5, time: "10 min ago", status: "Preparing" },
  { id: "ORD1031", menu: "Chicken Alfredo", table: 2, time: "5 min ago", status: "Cooking" },
];

const ActiveOrdersCard = () => (
  <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-full mb-4">
    <div className="text-lg font-semibold mb-2">Active Orders</div>
    <ul>
      {activeOrders.map(order => (
        <li key={order.id} className="flex justify-between py-2 border-b">
          <span>{order.menu} (Table {order.table})</span>
          <span className="text-xs text-gray-500">{order.status} - {order.time}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default ActiveOrdersCard;