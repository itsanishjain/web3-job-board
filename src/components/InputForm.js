import React from "react";
import { useState } from "react";
import { ethers } from "ethers";
import JobBoardABI from "../../jobBoard.json";
import { hasEthereum, requestAccount } from "../../utils";
import toast from "./Toast";

export default function InputForm() {
  const [loading, setLoading] = useState(false);
  const notify = React.useCallback((type, message) => {
    toast({ type, message });
  }, []);

  const dismiss = React.useCallback(() => {
    toast.dismiss();
  }, []);

  const [formValues, setFormValues] = useState({
    companyName: "",
    position: "",
    description: "",
    employmentType: "",
    location: "",
    companyWebsiteUrl: "",
    employer: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const validateForm = (_formValues) => {
    const errors = {};
    if (!_formValues.companyName) {
      errors.companyName = "Company name is required";
    }
    if (!_formValues.position) {
      errors.position = "Position is required";
    }
    if (!_formValues.description) {
      errors.description = "Description is required";
    }
    if (!_formValues.employmentType) {
      errors.employmentType = "Employment type is required";
    }
    if (!_formValues.location) {
      errors.location = "Location is required";
    }
    if (!_formValues.companyWebsiteUrl) {
      errors.companyWebsiteUrl = "Apply website URL is required";
    }
    return errors;
  };
  // create a function which set the values of form field
  const handleOnChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e, obj) => {
    e.preventDefault();
    let _errors = validateForm(formValues);
    setFormErrors(_errors);
    if (Object.keys(_errors).length === 0) {
      console.log("NOOOOO ERRORS");
      createJobPost();
    }
  };

  // create a job
  async function createJobPost() {
    if (!hasEthereum()) {
      notify("warning", "MetaMask unavailable");
      return;
    }
    setLoading(true);
    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signerAddress = await signer.getAddress();
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_JOBBOARD_ADDRESS,
      JobBoardABI,
      signer
    );

    let overrides = {
      // To convert Ether to Wei:
      value: ethers.utils.parseEther("0.005"), // ether in this case MUST be a string
    };
    const transaction = await contract.addJob(
      formValues.companyName,
      formValues.position,
      formValues.description,
      formValues.employmentType,
      formValues.location,
      formValues.companyWebsiteUrl,
      overrides
    );
    await transaction.wait();
    setLoading(false);
    console.log("JOB CREATED SUCCESSFULLY");
  }

  return (
    <form>
      {formErrors.companyName && (
        <span className="error">{formErrors.companyName}</span>
      )}
      <label>
        COMPANY NAME*
        <input
          required
          type="text"
          name={Object.keys(formValues)[0]}
          value={formValues.companyName}
          onChange={handleOnChange}
        ></input>
      </label>

      {formErrors.position && (
        <span className="error">{formErrors.position}</span>
      )}
      <label>
        POSITION*
        <input
          name={Object.keys(formValues)[1]}
          type="text"
          value={formValues.position}
          onChange={handleOnChange}
        ></input>
      </label>

      {formErrors.description && (
        <span className="error">{formErrors.description}</span>
      )}
      <label>
        DESCRIPTION*
        <input
          name={Object.keys(formValues)[2]}
          type="text"
          value={formValues.description}
          onChange={handleOnChange}
        ></input>
      </label>

      {formErrors.employmentType && (
        <span className="error">{formErrors.employmentType}</span>
      )}
      <label>
        EMPLOYMENT TYPE*
        <input
          name={Object.keys(formValues)[3]}
          type="text"
          value={formValues.employmentType}
          onChange={handleOnChange}
          placeholder="eg: Full Time"
        ></input>
      </label>

      {formErrors.location && (
        <span className="error">{formErrors.location}</span>
      )}

      <label>
        LOCATION*
        <input
          name={Object.keys(formValues)[4]}
          type="text"
          value={formValues.location}
          onChange={handleOnChange}
        ></input>
      </label>

      {formErrors.companyWebsiteUrl && (
        <span className="error">{formErrors.companyWebsiteUrl}</span>
      )}

      <label>
        APPLY URL*
        <input
          name={Object.keys(formValues)[5]}
          type="text"
          value={formValues.companyWebsiteUrl}
          onChange={handleOnChange}
        ></input>
      </label>

      {loading ? (
        <div className="loader"></div>
      ) : (
        <button onClick={(e) => handleSubmit(e, formValues)}>
          Post your job
        </button>
      )}
    </form>
  );
}
