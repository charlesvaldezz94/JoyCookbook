import React, { useState } from "react";
import "./Valentines.css";

const Valentines = () => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleReset = () => {
    setStep(1);
  };

  return (
    <div className="valentinesDateContainer">
      <div className="valContent">
        {step === 1 && (
          <div className="entranceSpeech">
            <div>
              Hi my baby! This is our second February together, and I wanted to
              show you how much you mean to me.
            </div>
            <button className="valBtn" onClick={handleNext}>
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="hidden1">
            <div>
              <p>
                You are the love of my life, and I could not be happier facing
                all of our life's challenges together.
              </p>
              <p>
                I love growing with you, learning with you, and figuring
                everything out with you. There's honestly no other person I
                would rather do this with.
              </p>
            </div>
            <button className="valBtn" onClick={handleNext}>
              Next
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="hidden2">
            <div>
              <p>
                I want you to know how deeply you are cherished. Your love is
                the greatest gift I've ever received.
              </p>
              <p>So I would like to ask you again..</p>
            </div>
            <button className="valBtn" onClick={handleNext}>
              Next
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="hidden3">
            <div>Will you be my valentine?</div>
            <div className="choiceBtnsContainer">
              <button className="yesBtn" onClick={handleNext}>
                Yes
              </button>
              <button className="noBtn">No</button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="hidden4">
            <div>I love you! Here's what I have planned!</div>
            <div>
              <img src="/images/Reservation.png" alt="Reservation" />{" "}
            </div>
            <div>
              {" "}
              <button className="valBtn" onClick={handleReset}>
                Reset
              </button>{" "}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Valentines;
