import { ReactElement } from "react";

export default function Header(): ReactElement {
  return (
    // Sticky header with gradient
    <div className="bg-gradient-to-r from-red-500 via-green-500 to-purple-500 h-12 sticky top-0"></div>
  );
}
