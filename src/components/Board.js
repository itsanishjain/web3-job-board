import React from "react";

export default function Board({
  id,
  companyName,
  position,
  employmentType,
  location,
  companyWebsiteUrl,
}) {
  const info = {
    display: "flex",
    flexDirection: "column",
  };

  return (
    <div className="card">
      <span className="card-rating">{id + 1}</span>
      <div className="info">
        <span>{companyName} - </span>
        <span>{position}</span>
        <p>
          <span>{employmentType} - </span> <span> {location}</span>
        </p>
      </div>

      <a href={companyWebsiteUrl} className="primary-btn">
        Apply
      </a>
    </div>
  );
}
