const tasks = [
  { id: 1, task: "Clean tables", done: false },
  { id: 2, task: "Restock napkins", done: true },
  { id: 3, task: "Check restroom supplies", done: false },
];

const TaskListCard = () => (
  <div className="bg-blue-50 rounded-2xl shadow p-4">
    <div className="text-md font-semibold text-blue-700 mb-2">Today's Tasks</div>
    <ul>
      {tasks.map((item) => (
        <li key={item.id} className="flex items-center gap-2 mb-1 text-sm">
          <input type="checkbox" checked={item.done} readOnly />
          <span className={item.done ? "line-through text-gray-400" : ""}>{item.task}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default TaskListCard;