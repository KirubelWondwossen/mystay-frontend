export function NavBtnName({ children, className }) {
  return (
    <span
      className={`${className} font-semibold cursor-pointer no-underline font-heading hover-fix`}
    >
      {children}
    </span>
  );
}
