export default function UserSortBy({ sortOptions, sortBy, onChange }) {
  return (
    <select
      className="border p-2 font-heading font-semibold rounded-xl cursor-pointer duration-200 hover:bg-gray-200 outline-none hover:border-slate-950"
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
