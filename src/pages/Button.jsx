export function Button({ children, className }) {
  return (
    <button
      className={`${className} bg-primary w-fit p-4 text-xl font-heading text-white`}
    >
      {children}
    </button>
  );
}
