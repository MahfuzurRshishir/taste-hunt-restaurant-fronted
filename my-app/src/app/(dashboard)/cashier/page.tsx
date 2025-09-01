import PaymentQueueCard from "./components/PaymentQueueCard";
import RecentTransactionsCard from "./components/RecentTransactionsCard";
import CashierShiftSummaryCard from "./components/CashierShiftSummaryCard";

export default function CashierDashboard() {
  return (
    <div className="p-6 flex flex-col gap-6">
      <h1 className="text-2xl font-bold mb-4">Cashier Dashboard</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* LEFT */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          <PaymentQueueCard />
          <RecentTransactionsCard />
        </div>
        {/* RIGHT */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          <CashierShiftSummaryCard />
        </div>
      </div>
    </div>
  );
}