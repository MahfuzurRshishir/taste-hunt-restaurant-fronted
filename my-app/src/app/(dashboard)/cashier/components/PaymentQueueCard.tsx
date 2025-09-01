const paymentQueue = [
  { id: "ORD1040", customer: "Alice", amount: 25, status: "Pending" },
  { id: "ORD1041", customer: "Bob", amount: 40, status: "Pending" },
];

const PaymentQueueCard = () => (
  <div className="bg-yellow-50 rounded-2xl shadow p-4">
    <div className="text-md font-semibold text-yellow-700 mb-2">Payment Queue</div>
    <ul>
      {paymentQueue.map((order) => (
        <li key={order.id} className="flex justify-between text-sm mb-1">
          <span>{order.customer} ({order.id})</span>
          <span className="font-bold">${order.amount}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default PaymentQueueCard;