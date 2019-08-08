'use strict';

const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
const passwordRegex =/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/g
const emailRequirements="wrong email format"
const passportRequirements="Ensure that password is 8 to 64 characters long and contains a mix of upper and lower case characters, one numeric and one special character"

const credentialValidation=({email,password})=> {
    let em =emailRegex.test(email)? {isValid:true}:{isValid:false,message:emailRequirements}
    let pass = passwordRegex.test(password)? {isValid:true}:{isValid:false,message:passportRequirements}
    return {email:em,password:pass}
}

export default credentialValidation

