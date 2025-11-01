function Page({ children }) {
  return (
    <div className="container mx-auto flex flex-col items-center dark:bg-backgroundDark h-screen">
      {children}
    </div>
  );
}

export default Page;
