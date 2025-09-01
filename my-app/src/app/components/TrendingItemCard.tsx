import Image from "next/image";

const trendingItems = [
  {
    image: "/burger.jpeg",
    title: "Smoky Beef Burgar",
    subtitle: "Burger",
    rating: 4.9,
    orders: 789,
    price: 599,
  },
  {
    image: "/pizza.jpeg",
    title: "Spicy Cheese Pizza",
    subtitle: "Pizza",
    rating: 4.8,
    orders: 678,
    price: 450,
  },
  {
    image: "/chicken.jpeg",
    title: "Hot BBQ Chicken",
    subtitle: "Chicken",
    rating: 4.6,
    orders: 567,
    price: 499,
  },
];

const TrendingItemCard = () => (
  <div className="flex flex-col gap-6">
    {trendingItems.map(({ image, title, subtitle, rating, orders, price }) => (
      <div
        key={title}
        className="bg-white rounded-2xl shadow-md p-4 flex flex-col gap-3 hover:shadow-2xl transition-shadow duration-300 w-full max-w-full"
      >
        <div className="w-full h-50 rounded-xl overflow-hidden mb-2 flex items-center justify-center bg-gray-50">
          <Image
            src={image}
            alt={title}
            width={160}
            height={120}
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <h3 className="font-bold text-base mb-0">{title}</h3>
          <p className="text-gray-400 text-xs">{subtitle}</p>
        </div>
        <div className="flex justify-between items-center text-gray-600 text-xs mt-2">
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span>{rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>🛒</span>
            <span>{orders}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-green-600">${price}</span>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default TrendingItemCard;