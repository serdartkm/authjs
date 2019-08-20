'use strict';

const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/g
const messageRegex =/df/g
const emailRequirements = "wrong email format"
const passportRequirements = "Ensure that password is 8 to 64 characters long and contains a mix of upper and lower case characters, one numeric and one special character"

const initialValidationState = {
    email: { isValid: true, message: "" },
    password: {
        isValid: true, message: ""
    }
}

const isValid = ({ email = undefined, password = undefined, message= undefined }) => {
    let emailValidation = true
    let passwordValidation = true
    if (email !== undefined) {
        emailValidation = emailRegex.test(email) ? { isValid: true } : { isValid: false, message: emailRequirements }
    }
    if (password !== undefined) {
        passwordValidation = passwordRegex.test(password) ? { isValid: true } : { isValid: false, message: passportRequirements }
    }
    if(message !== undefined){
        messageValidation = ""
    }
    const validationResult = { email: emailValidation, password: passwordValidation }
    return (self) => {
        self.setState({ validation: { ...validationResult } })
        if (validationResult.email.isValid && validationResult.password.isValid) {
            return true
        }
        else {
            return false
        }

    }
}

//export default isValid
export {
    initialValidationState,
    isValid
}

