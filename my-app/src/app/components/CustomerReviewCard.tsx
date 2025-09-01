'use client';
import Image from "next/image";
import { useEffect, useState } from "react";


const reviews = [
    {
        title: "Classic Italian Penne",
        review: "This pasta is divine! The flavor is prominent, creating a rich, savory, unforgettable taste. Highly recommended for pasta lovers!",
        user: "Sarah M.",
        date: "Oct 12, 2035",
        rating: 5,
        image: "/penne.jpeg",
    },
    {
        title: "Spicy Cheese Pizza",
        review: "The cheese is gooey and the crust is perfectly crisp. A must-try for pizza lovers who like a little kick!",
        user: "John D.",
        date: "Nov 2, 2035",
        rating: 4,
        image: "/pizza.jpeg",
    },
    {
        title: "Hot BBQ Chicken",
        review: "Juicy and flavorful! The BBQ sauce is smoky and sweet. My family loved it.",
        user: "Emily R.",
        date: "Dec 5, 2035",
        rating: 5,
        image: "/chicken.jpeg",
    },
    {
        title: "Fresh Garden Salad",
        review: "Crisp veggies and a tangy dressing. Refreshing and healthy. Will order again!",
        user: "Alex P.",
        date: "Jan 8, 2036",
        rating: 4,
        image: "/burger.jpeg",
    },
];
const TRANSITION_DURATION = 1000; // ms
const INTERVAL = 3500; // ms

const CustomerReviewCard = () => {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState<"in" | "out">("in");

    useEffect(() => {
        const interval = setInterval(() => {
            setDirection("out");
            setTimeout(() => {
                setCurrent((prev) => (prev + 1) % reviews.length);
                setDirection("in");
            }, TRANSITION_DURATION);
        }, INTERVAL);
        return () => clearInterval(interval);
    }, []);

    const review = reviews[current];
    return (
        <div className="bg-white rounded-2xl shadow-2xl p-6 flex flex-col gap-2 w-full max-w-full overflow-hidden">
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-500">Customer review</span>
                <a href="#" className="text-sm font-semibold text-gray-400 hover:underline">see more</a>
            </div>
            <div
                className={`
          flex flex-col md:flex-row gap-4 items-center
          transition-transform transition-opacity duration-1000 ease-in-out
          ${direction === "in" ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}
        `}
                key={current}
                style={{ minHeight: 140 }}
            >
                <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">{review.title}</h3>
                    <p className="text-gray-500 text-sm mb-2">{review.review}</p>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="font-semibold">{review.user}</span>
                        <span className="text-xs text-gray-400">- {review.date}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                        {[...Array(review.rating)].map((_, i) => (
                            <span key={i} className="text-yellow-400 text-lg">★</span>
                        ))}
                        <span className="ml-2 font-bold text-black">{review.rating}</span>
                    </div>
                </div>
                <div className="w-28 h-28 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                        src={review.image}
                        alt={review.title}
                        width={112}
                        height={112}
                        className="object-cover w-full h-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default CustomerReviewCard;