function RoomCardContainer({ children }) {
  return (
    <div className="grid grid-cols-1 items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-9">
      {children}
    </div>
  );
}

export default RoomCardContainer;
