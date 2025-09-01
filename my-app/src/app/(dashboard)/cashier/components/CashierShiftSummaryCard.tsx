const summary = {
  totalTransactions: 15,
  totalAmount: 350,
  shift: "Morning (9:00 AM - 5:00 PM)",
};

const CashierShiftSummaryCard = () => (
  <div className="bg-blue-50 rounded-2xl shadow p-4">
    <div className="text-md font-semibold text-blue-700 mb-2">Shift Summary</div>
    <div className="text-sm">Shift: {summary.shift}</div>
    <div className="text-sm">Total Transactions: {summary.totalTransactions}</div>
    <div className="text-sm">Total Amount: <span className="font-bold">${summary.totalAmount}</span></div>
  </div>
);

export default CashierShiftSummaryCard;