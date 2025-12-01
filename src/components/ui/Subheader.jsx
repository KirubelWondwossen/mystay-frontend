function Subheader({ children }) {
  return (
    <h3 className="text-start text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold font-heading">
      {children}
    </h3>
  );
}

export default Subheader;
