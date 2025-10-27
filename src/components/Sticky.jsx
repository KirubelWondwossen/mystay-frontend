function Sticky({ children, pos }) {
  return (
    <div className={`sticky ${pos}-0 z-50 bg-white dark:bg-black w-full p-3`}>
      {children}
    </div>
  );
}

export default Sticky;
