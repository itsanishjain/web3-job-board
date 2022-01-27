import React from "react";

export default function Board({
  companyName,
  position,
  employmentType,
  location,
  companyWebsiteUrl,
}) {
  const boardStyle = {
    backgroundColor: "#c694ea",
    display: "flex",
    justifyContent: "space-between",
    padding: "30px",
    fontWeight: 800,
  };
  const info = {
    display: "flex",
    flexDirection: "column",
  };

  // write a function that checks is link is valid or not
  function isValidHttpUrl(string) {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      //   return false;
      console.log("ERROR");
    }
    let valid = url.protocol === "http:" || url.protocol === "https:";
    if (valid) return url;
    else return "https://twitter.com/itsanishjain";
  }

  //   const applyHit = (url) => {
  //     let isValid = isValidHttpUrl(url);
  //     console.log("Apply hit", url, isValid);
  //     if(!isValid){
  //         ''
  //     }
  //   };

  return (
    <div style={boardStyle}>
      <img className="logo" src="companyLogo.png" alt="logo"></img>
      <div style={info}>
        <span className="badge">{companyName}</span>
        <span>{position}</span>
        <div style={{ display: "flex", paddingRight: "10px" }}>
          <p>{employmentType}</p> <p>{location}</p>
        </div>
      </div>
      {/* <span onClick={() => applyHit(companyWebsiteUrl)} className="primary-btn">
        apply
      </span> */}
      <a href={companyWebsiteUrl} className="primary-btn">
        Apply
      </a>
    </div>
  );
}
