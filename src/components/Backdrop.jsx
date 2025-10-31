function Backdrop({ handleOpenModal }) {
  return (
    <div
      onClick={handleOpenModal}
      className="fixed top-0 left-0 w-screen h-screen bg-black/50 z-[1000]"
    />
  );
}

export default Backdrop;
