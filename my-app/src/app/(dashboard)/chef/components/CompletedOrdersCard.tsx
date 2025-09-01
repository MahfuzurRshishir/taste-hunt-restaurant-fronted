const completedOrders = [
  { id: "ORD1028", menu: "Veggie Pizza", time: "2 min ago" },
  { id: "ORD1029", menu: "Chicken Caesar Salad", time: "5 min ago" },
];

const CompletedOrdersCard = () => (
  <div className="bg-green-50 rounded-2xl shadow p-4">
    <div className="text-md font-semibold text-green-700 mb-2">Recently Completed Orders</div>
    <ul>
      {completedOrders.map((order) => (
        <li key={order.id} className="flex justify-between text-sm">
          <span>{order.menu}</span>
          <span className="text-xs text-gray-500">{order.time}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default CompletedOrdersCard;