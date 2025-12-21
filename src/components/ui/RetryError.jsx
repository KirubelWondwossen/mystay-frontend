export function RetryError({ getData, error, id }) {
  const token = localStorage.getItem("token");

  return (
    <div className="max-w-xl mx-auto mt-10 bg-red-50 border border-red-200 p-4 rounded">
      <p className="text-red-600 font-medium">
        {typeof error === "string"
          ? error
          : error.message || "Something went wrong"}
      </p>

      <button
        onClick={() => getData(token, id)}
        className="mt-3 px-4 py-2 bg-red-600 text-white rounded-sm"
      >
        Retry
      </button>
    </div>
  );
}
