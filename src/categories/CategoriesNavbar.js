import React from "react";
import { Link } from "react-router-dom";

export default function CategoriesNavbar({ name, link, image, onClick }) {
  const content = (
    <button
      style={{
        fontSize: "30px",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        color: "gray",
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
