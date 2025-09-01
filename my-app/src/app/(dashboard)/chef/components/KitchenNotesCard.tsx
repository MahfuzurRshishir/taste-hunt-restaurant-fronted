const notes = [
  { id: 1, note: "Remember to check the oven temperature before baking." },
  { id: 2, note: "Today's special: Add extra basil to Margherita pizza." },
];

const KitchenNotesCard = () => (
  <div className="bg-yellow-50 rounded-2xl shadow p-4">
    <div className="text-md font-semibold text-yellow-700 mb-2">Kitchen Notes</div>
    <ul>
      {notes.map((item) => (
        <li key={item.id} className="mb-1 text-sm">• {item.note}</li>
      ))}
    </ul>
  </div>
);

export default KitchenNotesCard;