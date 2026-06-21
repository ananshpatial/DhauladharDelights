import React from "react";

const Loader = ({ label = "Loading fresh picks" }) => (
  <div className="loader-wrap" role="status" aria-live="polite">
    <span className="spinner" />
    <span>{label}</span>
  </div>
);

export default Loader;
