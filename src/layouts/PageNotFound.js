import React from "react";
import { Link } from "react-router-dom";
const PageNotFound = () => {
  return (
        <div>
            <h3>Error 404 Page Not Found</h3>
            <Link to="/gateway" style={{ textDecoration: "underline" }}>Gateways List</Link>
        </div>
  );
};

export default PageNotFound;