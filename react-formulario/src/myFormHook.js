import { useState } from "react";

const useSignupForm = () => {
    
    const [inputs,setInputs] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form Submited",inputs);
    };


    const handleInputChange = (event) => {
        setInputs({...inputs,[event.target.name]: event.target.value});
    }


    return {handleSubmit,handleInputChange};
}

export default useSignupForm;