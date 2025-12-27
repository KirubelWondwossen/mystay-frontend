function Page({ children }) {
  return (
    <div className="flex flex-col items-center justify-center dark:bg-backgroundDark h-screen">
      {children}
    </div>
  );
}

export default Page;
