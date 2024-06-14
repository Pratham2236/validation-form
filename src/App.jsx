import React, { useState } from "react";
import "./App.css"; // Make sure to include the relevant CSS

const App = () => {
  const [inputs, setInputs] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: ""
  });

  const [validations, setValidations] = useState({
    valid1: "",
    valid2: "",
    valid3: "",
    valid4: "",
    valid5: ""
  });

  const [touched, setTouched] = useState({
    input1: false,
    input2: false,
    input3: false,
    input4: false,
    input5: false
  });

  const validateLength = (value) => {
    if (value === "") {
      return { message: "Please enter your name", isValid: false };
    }
    return { message: "Approved", isValid: true };
  };

  const validateNumeric = (value) => {
    if (/^\d+$/.test(value) && value.length === 10) {
      return { message: "Approved", isValid: true };
    }
    return { message: "Please enter phone number (10 digits)", isValid: false };
  };

  const validateEmail = (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(value)) {
      return { message: "Approved", isValid: true };
    }
    return { message: "Please enter a valid email address", isValid: false };
  };

  const validateAlphabetic = (value) => {
    if (/^[a-zA-Z]+$/.test(value)) {
      return { message: "Approved", isValid: true };
    }
    return { message: "Please enter alphabetic characters only", isValid: false };
  };

  const validateCustom = (value) => {
    if (value.length === 5) {
      return { message: "Approved", isValid: true };
    }
    return { message: "Please enter exactly 5 characters", isValid: false };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
    setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
  };

  const handleSubmit = () => {
    let allValid = true;
    const newValidations = {};

    const fields = [
      { name: "input1", validation: validateLength },
      { name: "input2", validation: validateNumeric },
      { name: "input3", validation: validateEmail },
      { name: "input4", validation: validateAlphabetic },
      { name: "input5", validation: validateCustom }
    ];

    fields.forEach((field) => {
      const result = field.validation(inputs[field.name]);
      newValidations[`valid${field.name.slice(-1)}`] = result.message;
      if (!result.isValid) {
        allValid = false;
      }
    });

    setValidations(newValidations);

    if (allValid) {
      showSuccessToast();
    } else {
      showErrorToast();
    }
  };

  const showToast = ({ title, message, type, duration }) => {
    const toast = document.createElement("div");
    toast.classList.add("toast", `toast--${type}`);
    toast.innerHTML = `
      <div class="toast__icon"><i class="fas fa-${type === "success" ? "check-circle" : "exclamation-circle"}"></i></div>
      <div class="toast__body">
        <h3 class="toast__title">${title}</h3>
        <p class="toast__msg">${message}</p>
      </div>
      <div class="toast__close"><i class="fas fa-times"></i></div>
    `;
    document.getElementById("toast").appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, duration);
  };

  const showSuccessToast = () => {
    showToast({
      title: "Success",
      message: "You Logged In Successfully",
      type: "success",
      duration: 5000
    });
  };

  const showErrorToast = () => {
    showToast({
      title: "Failure",
      message: "An error occurred, please contact the administrator.",
      type: "error",
      duration: 5000
    });
  };

  const getInputStyle = (validationMessage, isTouched) => {
    if (validationMessage === "Approved") {
      return { borderColor: "green" };
    } else if (isTouched && validationMessage) {
      return { borderColor: "red" };
    } else {
      return { borderColor: "grey" };
    }
  };

  return (
    <div className="App">
      <div id="toast"></div>
      <div>
        <h1>register form</h1>
        <label>
          <input
            placeholder="Name:"
            type="text"
            name="input1"
            value={inputs.input1}
            onChange={handleChange}
            style={getInputStyle(validations.valid1, touched.input1)}
          />
          <span style={{ color: validations.valid1 === "Approved" ? "green" : "red" }}>{validations.valid1}</span>
        </label>
      </div>
      <div>
        <label>
          <input
            placeholder="Phone Number:"
            type="text"
            name="input2"
            value={inputs.input2}
            onChange={handleChange}
            style={getInputStyle(validations.valid2, touched.input2)}
          />
          <span style={{ color: validations.valid2 === "Approved" ? "green" : "red" }}>{validations.valid2}</span>
        </label>
      </div>
      <div>
        <label>
          <input
            placeholder="Email:"
            type="text"
            name="input3"
            value={inputs.input3}
            onChange={handleChange}
            style={getInputStyle(validations.valid3, touched.input3)}
          />
          <span style={{ color: validations.valid3 === "Approved" ? "green" : "red" }}>{validations.valid3}</span>
        </label>
      </div>
      <div>
        <label>
          <input
            placeholder="Alphabetic Only:"
            type="text"
            name="input4"
            value={inputs.input4}
            onChange={handleChange}
            style={getInputStyle(validations.valid4, touched.input4)}
          />
          <span style={{ color: validations.valid4 === "Approved" ? "green" : "red" }}>{validations.valid4}</span>
        </label>
      </div>
      <div>
        <label>
          <input
            placeholder="Custom (5 chars):"
            type="text"
            name="input5"
            value={inputs.input5}
            onChange={handleChange}
            style={getInputStyle(validations.valid5, touched.input5)}
          />
          <span style={{ color: validations.valid5 === "Approved" ? "green" : "red" }}>{validations.valid5}</span>
        </label>
      </div>
      <button className="btn btn--success" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default App;
