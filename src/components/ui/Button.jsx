function Button({ children, className, onClick }) {
  return (
    <button onClick={onClick} className={`${className} w-fit font-heading`}>
      {children}
    </button>
  );
}

export default Button;
