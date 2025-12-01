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
      <Link
        to={link}
        style={{
          textDecoration: "none",
        }}
      >
        <button
          style={{
            fontSize: "30px",
            background: isActive ? "DodgerBlue" : "transparent",
            border: "none",
            cursor: "pointer",
            color: isActive ? "white" : "gray",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          {image && (
            <img
              src={image}
              alt={name}
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          )}
          {name}
        </button>
      </Link>
    </>
  );
}
