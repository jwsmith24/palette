export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="bg-gray-800 p-2 rounded-2xl items-center grid">
      <div className="relative w-full h-6 bg-gray-900 rounded-2xl overflow-hidden grid">
        <div
          className="absolute top-0 left-0 h-full bg-green-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <h2 className="p-1 text-white">{progress}% Graded</h2>
    </div>
  );
}
