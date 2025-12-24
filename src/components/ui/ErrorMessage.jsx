import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

function ErrorMessage({ message = "Something went wrong" }) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-lg bg-red-50 text-red-700 border border-red-200">
      <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
      <p className="font-body text-sm">{message}</p>
    </div>
  );
}

export default ErrorMessage;
