function Button({ children, className, onClick, type }) {
  return (
    <button
      onClick={onClick}
      className={`${className} w-fit font-heading`}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
