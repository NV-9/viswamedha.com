import React from "react";
import "../assets/css/Tabs.css";

const Tabs = ({ names }) => {
    return (
        <div className="button-group">
            {names.map((label, index) => (
                <button className="parallelogram" key={index}>
                    <span>{label}</span>
                </button>
            ))}
        </div>
    );
  };

export default Tabs;
