import { Link, useLocation } from "react-router-dom";
import React from "react";

function currentPathIsHome(link, currentPath) {
  if (currentPath === link) {
    return true;
  } else {
    return false;
  }
}

export default function CategoriesNavbar({ name, link, image }) {
  const [isActive, setIsActive] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    setIsActive(currentPathIsHome(link, location.pathname));
  }, [link, location.pathname]);

  return (
    <>
      <Link to={link}>
        <button
          style={{
            fontSize: "30px",
            background: isActive ? "DodgerBlue" : "transparent",
            border: "none",
            cursor: "pointer",
            color: isActive ? "white" : "gray",
          }}
        >
          {image && <img src={image} alt={name} style={{ width: "50px", height: "50px", marginRight: "10px" }} />}
          {name}
        </button>
      </Link>
    </>
  );
}
