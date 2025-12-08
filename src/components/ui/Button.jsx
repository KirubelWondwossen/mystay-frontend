function Button({ children, className, ...props }) {
  return (
    <button className={`${className} w-fit font-heading`} {...props}>
      {children}
    </button>
  );
}

export default Button;
