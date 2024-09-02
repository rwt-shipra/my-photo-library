export default function Loading() {
  return (
    <div className="h-full w-full grid place-content-center">
      <svg
        className="text-slate-500 animate-pulse"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 139 92"
        width={139}
        height={92}
        fill="none"
      >
        <circle cx="6" cy="50" r="6" fill="currentColor"></circle>
        <circle cx="26" cy="50" r="6" fill="currentColor"></circle>
        <circle cx="46" cy="50" r="6" fill="currentColor"></circle>
      </svg>
    </div>
  );
}
