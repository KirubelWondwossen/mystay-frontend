export default function LabelInput({
  label,
  name,
  type,
  min,
  max,
  setFormData,
  placeholder,
}) {
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
          onChange={handleChange}
          required
        />
      ) : (
        <input
          className="border border-[#d1d5db] rounded-sm shadow-sm focus:outline-primary w-72 px-2 py-1"
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          {...(min ? { min } : {})}
          {...(max ? { max } : {})}
          {...(type === "tel"
            ? {
                pattern: "^+?[1-9]d{1,14}$",
                placeholder: "+251912345678",
                maxLength: 15,
                min: 2,
              }
            : {})}
          onChange={handleChange}
          required
        />
      )}
    </div>
  );
}
