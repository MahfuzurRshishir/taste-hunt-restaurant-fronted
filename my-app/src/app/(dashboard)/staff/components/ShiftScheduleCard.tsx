const shifts = [
  { day: "Monday", time: "9:00 AM - 5:00 PM" },
  { day: "Wednesday", time: "1:00 PM - 9:00 PM" },
  { day: "Friday", time: "9:00 AM - 5:00 PM" },
];

const ShiftScheduleCard = () => (
  <div className="bg-green-50 rounded-2xl shadow p-4">
    <div className="text-md font-semibold text-green-700 mb-2">Upcoming Shifts</div>
    <ul>
      {shifts.map((shift, idx) => (
        <li key={idx} className="flex justify-between text-sm">
          <span>{shift.day}</span>
          <span>{shift.time}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default ShiftScheduleCard;