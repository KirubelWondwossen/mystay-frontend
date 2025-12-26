const PAGE_SIZE = 9;
import Button from "./Button";

export default function PrevNext({ page, setPage, total }) {
  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="flex gap-4 justify-end mt-4">
      <Button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className={`px-3 py-1 rounded ${
          page === 1
            ? "opacity-40 cursor-not-allowed"
            : "hover:bg-primary hover:text-white"
        }`}
      >
        Previous
      </Button>

      <Button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className={`px-3 py-1 rounded ${
          page === totalPages
            ? "opacity-40 cursor-not-allowed"
            : "hover:bg-primary hover:text-white"
        }`}
      >
        Next
      </Button>
    </div>
  );
}
