export default function LabelInput({ label, name, type, min, max }) {
  return (
    <div
      className={`flex flex-col items-start p-3 gap-2 ${
        type === "textarea" ? "col-span-2" : ""
      }`}
    >
      <label htmlFor={name} className="font-body font-medium text-tSecondary">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          name={name}
          id={name}
          className="border w-full h-24 border-[#d1d5db] rounded-sm shadow-sm focus:outline-primary px-4 py-2"
        />
      ) : (
        <input
          type={type}
          name={name}
          id={name}
          className={`border border-[#d1d5db] rounded-sm shadow-sm focus:outline-primary w-72 px-2 py-1`}
          {...(min ? { min } : {})}
          {...(max ? { max } : {})}
        />
      )}
    </div>
  );
}
