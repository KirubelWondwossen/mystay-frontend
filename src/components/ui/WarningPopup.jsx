import Button from "./Button";

export default function WarningPopup({ handleClose, onClick, roomId }) {
  return (
    <div
      className="fixed bg-white z-[1001] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
      rounded-xl shadow-lg w-64 mx-auto flex flex-col items-center gap-4 py-3 px-2"
    >
      <p className="text-tSecondary self-center font-medium font-heading text-xl">
        Are you sure?
      </p>
      <div className="flex items-center justify-center gap-8 w-full p-3 ">
        {!roomId && (
          <Button
            className="text-white py-2 px-5 rounded-xl text-xl bg-error hover:bg-[#a71919]"
            type="button"
            onClick={onClick}
          >
            Yes
          </Button>
        )}

        {roomId && (
          <Button
            className="text-white py-2 px-5 rounded-xl text-xl bg-error hover:bg-[#a71919]"
            type="button"
            onClick={() => onClick(roomId)}
          >
            Yes
          </Button>
        )}
        <Button
          type="button"
          className=" text-tSecondary border border-[#e5e7eb] hover:bg-[#f9fafb] py-2 px-5 rounded-xl text-xl"
          onClick={handleClose}
        >
          No
        </Button>
      </div>
    </div>
  );
}
