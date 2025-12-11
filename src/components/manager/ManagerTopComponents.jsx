function ManagerTopComponents({ header, children }) {
  return (
    <div className={`flex justify-between w-full items-center relative`}>
      <h1 className="font-heading text-tSecondary font-semibold text-3xl text-start">
        {header}
      </h1>
      {children}
    </div>
  );
}

export default ManagerTopComponents;
