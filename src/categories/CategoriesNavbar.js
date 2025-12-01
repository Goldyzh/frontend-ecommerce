import React from "react";
import { Link, useLocation } from "react-router-dom";

function currentPathIsHome(link, currentPath) {
  if (currentPath === link) {
    return true;
  } else {
    return false;
  }
}

export default function CategoriesNavbar({ name, link, image, onClick }) {
  const [isActive, setIsActive] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    if (link) {
      setIsActive(currentPathIsHome(link, location.pathname));
    }
  }, [link, location.pathname]);

  const content = (
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
      onClick={onClick}
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
  );

  return link ? (
    <Link
      to={link}
      style={{
        textDecoration: "none",
      }}
    >
      {content}
    </Link>
  ) : (
    content
  );
}
