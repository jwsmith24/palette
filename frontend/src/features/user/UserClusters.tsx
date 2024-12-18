/*
Main view for the Criteria Cluster feature.
 */

import { ReactElement } from "react";

import { Header, Footer } from "@components";

export default function ClusterBuilder(): ReactElement {
  return (
    <div className="min-h-screen flex flex-col justify-between w-screen bg-gradient-to-b from-gray-900 to-gray-700 text-white font-sans">
      {/* Sticky Header with Gradient */}
      <Header />

      <h1 className="font-extrabold text-2xl mb-2 text-center">
        <p>Clusters Page Coming Soon...</p>
      </h1>

      {/* Sticky Footer with Gradient */}
      <Footer />
    </div>
  );
}
