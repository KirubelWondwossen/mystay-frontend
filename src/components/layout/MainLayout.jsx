function Main({ children, style }) {
  return (
    <main
      className={`${style} flex-1 overflow-y-auto flex flex-col items-center no-scrollbar`}
    >
      {children}
    </main>
  );
}

export default Main;
