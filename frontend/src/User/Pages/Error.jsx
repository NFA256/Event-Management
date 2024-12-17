import React from "react";

const Error = () => {
  return (
    <div
      className="d-flex flex-column align-items-center mt-5 text-center"
      style={{ height: "60vh"}}
    >
      <img
        src="assets/img/logo/404.png"
        alt="404 Illustration"
        style={{ maxWidth: "200px" }}
      />
      <h1 className="fw-bold">That's odd</h1>
      <p className="text-muted fs-5">This page appears to be missing.</p>
    </div>
  );
};

export default Error;
