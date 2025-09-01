const transactions = [
  { id: "TXN2001", customer: "Alice", amount: 25, time: "2 min ago" },
  { id: "TXN2002", customer: "Bob", amount: 40, time: "10 min ago" },
];

const RecentTransactionsCard = () => (
  <div className="bg-green-50 rounded-2xl shadow p-4">
    <div className="text-md font-semibold text-green-700 mb-2">Recent Transactions</div>
    <ul>
      {transactions.map((txn) => (
        <li key={txn.id} className="flex justify-between text-sm mb-1">
          <span>{txn.customer} ({txn.id})</span>
          <span>${txn.amount} <span className="text-xs text-gray-500">({txn.time})</span></span>
        </li>
      ))}
    </ul>
  </div>
);

export default RecentTransactionsCard;