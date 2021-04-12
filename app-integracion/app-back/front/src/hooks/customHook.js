import { useState } from "react";
import axios from "axios";
import Jobs from "../components/Jobs";

const useInputForm = (schema) => {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const { error } = validate();
    if (!error) {
      axios.post("http://localhost:3001/offers",inputs)
        .then( () =>
          {console.log("Form submitted: \n",inputs);
    })
        .catch(err=>console.log(err))
    } else {
      console.log(error);
      setErrors(error);
    }
  };

  const handleInputChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
    console.log(inputs);
  };

  const validate = () => {
    return schema.validate(inputs);
  };

  return { handleSubmit, handleInputChange, errors };
};

export default useInputForm;
