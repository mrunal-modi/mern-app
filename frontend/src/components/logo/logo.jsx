import React from "react";
import "./logo.scss";
import { logo, brandName } from "../../config/component-config-navbar";

export default function Logo() {
  return (
    <div className="logo-container">
      {logo && <img src={logo} className="logo" alt="logo" />}
      {(!logo && brandName) && <h4>{brandName}</h4>}
    </div>
  );
}
