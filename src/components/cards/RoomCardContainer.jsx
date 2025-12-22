function RoomCardContainer({ children }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-9">
      {children}
    </div>
  );
}

export default RoomCardContainer;
