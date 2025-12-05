export default function SortBy({ sortOptions, sortBy, onChange }) {
  return (
    <select
      className="bg-white p-1 rounded-md shadow-sm font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      value={sortBy}
      onChange={(e) => onChange(e.target.value)}
    >
      {sortOptions.map((item, i) => (
        <option key={i} value={item.value}>
          {item.text}
        </option>
      ))}
    </select>
  );
}
