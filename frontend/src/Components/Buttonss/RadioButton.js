import React from "react";

const RadioButton = (props) => {

  const { handlegender, gender } = props;




  return (
    <div className="container">
      <div className="radio">

        <div
          className="radio-btn"

        >
          <input
            type="radio"
            value={gender}
            name="Male"
            onChange={() => {
              handlegender("Male");
            }}
            checked={gender === "Male"}
          />
          Male
        </div>

        <div
          className="radio-btn"

        >
          <input
            type="radio"
            value={gender}
            name="Feamle"
            onChange={() => {
              handlegender("Female");
            }}
            checked={gender === "Female"}
          />
          Female
        </div>

        <div
          className="radio-btn"

        >
          <input
            type="radio"
            value={gender}
            name="Other"
            onChange={() => {
              handlegender("Other");
            }}
            checked={gender === "Other"}
          />
          Other
        </div>

      </div>
    </div>
  );
}

export default RadioButton;