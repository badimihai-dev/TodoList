import React from "react";

export default function Header() {
  return (
    <div style={headerStyle}>
      <h1>todos!</h1>
    </div>
  );
}
const headerStyle = {
  backgroundColor: "#555",
  color: "#fff",
  textAlign: "center",
  padding: '10px'
};
