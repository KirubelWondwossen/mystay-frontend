// eslint-disable-next-line
export function TextIcon({ text, icon: Icon }) {
  return (
    <div className="flex gap-3 items-center px-4">
      <div className="flex gap-3 items-center">
        <Icon className="w-8" />
        <span className="text-lg">{text}</span>
      </div>
    </div>
  );
}
