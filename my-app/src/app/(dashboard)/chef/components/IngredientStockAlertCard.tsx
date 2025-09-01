const lowStock = [
  { name: "Tomatoes", qty: 2, unit: "kg" },
  { name: "Mozzarella", qty: 1, unit: "kg" },
];

const IngredientStockAlertCard = () => (
  <div className="bg-red-50 rounded-2xl shadow p-4 mb-4">
    <div className="text-md font-semibold text-red-700 mb-2">Low Stock Ingredients</div>
    <ul>
      {lowStock.map(item => (
        <li key={item.name} className="flex justify-between">
          <span>{item.name}</span>
          <span className="font-bold">{item.qty} {item.unit}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default IngredientStockAlertCard;