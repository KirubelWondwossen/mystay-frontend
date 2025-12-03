export default function SortBy({ sortOptions }) {
  return (
    <select className="bg-white p-1 rounded-md shadow-sm font-body text-sm  focus:outline-none focus:ring-2 focus:ring-primary">
      {sortOptions.map((items, i) => (
        <option key={i} value={items.value}>
          {items.text}
        </option>
      ))}
    </select>
  );
}
