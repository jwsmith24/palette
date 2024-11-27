import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-700">
      <div className="text-center bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-9xl font-bold text-cyan-500">404</h1>
        <p className="text-lg mt-4 text-gray-600">Welp, this is awkward..</p>
        <p className="text-lg mt-4 text-gray-600">
          This probably isn't the page you're looking for.
        </p>
        {/*Use a Link element to reroute back to home page*/}
        <Link
          to="/"
          className="inline-block mt-6 px-6 py-3 bg-cyan-500 text-white text-sm font-medium rounded-md hover:bg-cyan-600 transition duration-300"
        >
          Let's Try Again
        </Link>
      </div>
    </div>
  );
};
