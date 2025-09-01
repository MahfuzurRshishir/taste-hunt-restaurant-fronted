import RecentOrdersCard from "../../components/RecentOrdersCard";
import RecentActivityCard from "../../components/RecentActivityCard";
import ActiveOrdersCard from "./components/ActiveOrdersCard";
import IngredientStockAlertCard from "./components/IngredientStockAlertCard";
import KitchenNotesCard from "./components/KitchenNotesCard";
import CompletedOrdersCard from "./components/CompletedOrdersCard";

const ChefDashboard = () => {
  return (
    <>
      <div className="p-4 flex gap-4 flex-col md:flex-row">
        {/* LEFT */}
        <div className="w-full lg:w-2/3 flex flex-col gap-8">
          <IngredientStockAlertCard />
          <ActiveOrdersCard />
          <CompletedOrdersCard />
          <div className="rounded-3xl w-full shadow-md">
            <RecentOrdersCard />
          </div>
        </div>
        {/* RIGHT */}
        <div className="w-full lg:w-1/3 flex flex-col gap-10">
          <div className="w-full h-[40px] px-20 rounded-3xl flex items-center justify-between">
            <h2 className="text-xl font-bold">Recent Activity</h2>
          </div>
          <RecentActivityCard />
          <KitchenNotesCard />
        </div>
      </div>
      {/* ...footer remains unchanged... */}
    </>
  );
};
export default ChefDashboard;