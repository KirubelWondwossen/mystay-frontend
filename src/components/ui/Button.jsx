function Button({ children, className }) {
  return (
    <button className={`${className} w-fit font-heading text-white`}>
      {children}
    </button>
  );
}

export default Button;
