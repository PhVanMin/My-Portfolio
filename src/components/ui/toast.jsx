export default function Toast({ title, message, success = false }) {
  return (
    <div
      className={`${
        success ? "bg-green-500" : "bg-red-500"
      } px-5 py-4 rounded-lg animate-fade`}>
      <p className="font-bold">{title}</p>
      <p>{message}</p>
    </div>
  );
}
