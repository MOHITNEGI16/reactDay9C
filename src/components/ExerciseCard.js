import React from "react";
import "./ExerciseCard.css";

function ExerciseCard({ url, name, target, bodyPart }) {
  return (
    <>
      <div className="card">
        <img src={url} alt="exerciseGif"  />
        <h1>{name}</h1>
        <span>{target}</span>
        <span>{bodyPart}</span>
      </div>
    </>
  );
}

export default ExerciseCard;
