import { ReactElement } from 'react';
import Navbar from '../util/Navbar.tsx';

export default function Header(): ReactElement {
  return (
    // Sticky header with gradient
    <div className="bg-gradient-to-r from-red-500 via-green-500 to-purple-500 min-h-12 h-16 sticky top-0">
      <Navbar />
    </div>
  );
}
