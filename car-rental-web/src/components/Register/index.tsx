import { useEffect, useState } from "react"
import { createProfile, getProfile } from "../../service/ProfileService"
import { MdOutlineErrorOutline } from 'react-icons/md';
import bcrypt from 'bcryptjs'



interface iFieldValidation {
    value: string
    error?: string
}


export default function Register() {

    const [firstName, setFirstName] = useState<iFieldValidation>({ value: "" })
    const [surname, setSurname] = useState<iFieldValidation>({ value: "" })
    const [email, setEmail] = useState<iFieldValidation>({ value: "" })
    const [phoneNumber, setPhoneNumber] = useState<iFieldValidation>({ value: "" })
    const [password, setPassword] = useState<iFieldValidation>({ value: "" })

    function validate(value: any, valid: boolean, error: string) {
        return { value: value, error: valid ? "" : error }

    }

    function getForm() {
        return (
            <>
                <div>
                    <input value={firstName.value} className="input-div double-field" placeholder="First Name" type="text" id="firtName" onChange={(value => setFirstName(validate(value.target.value, value.target.value.length >= 5, "First Name must contain more than 4 characters")))} />
                    {/* <MdOutlineErrorOutline className="error-red error-icon"/> */}
                    <input value={surname.value}   className="input-div double-field" placeholder="Surname" type="text" id="surname" onChange={(value => setSurname(validate(value.target.value, value.target.value.length >= 5, "Surname must contain more than 4 characters")))} />
                </div>
                <div>
                    <input value={email.value}  className="input-div" placeholder="Email" type="text" id="email" onChange={(value => setEmail(validate(value.target.value, value.target.value.includes("@"), "Must be a valid email")))} />
                </div>
                <div>
                    <input value={phoneNumber.value}   className="input-div" placeholder="Phone Number" type="text" id="phoneNumber" onChange={(value => setPhoneNumber(validate(value.target.value, true, "Must be a valid email")))} />
                </div>
                <div>
                    <input value={password.value}   className="input-div" placeholder="Password" type="password" id="password" onChange={(value => setPassword(validate(value.target.value, true, "Must be a valid email")))} />
                </div>
            </>

        )
    }

    return (
        <div className="create-profile-container">
            {getForm()}
            <div>
                <button className="submit-button" 
                    onClick={() => createProfile({ firstName: firstName.value, surname: surname.value, email: email.value, phoneNumber: phoneNumber.value, password: bcrypt.hashSync(password.value, '$2a$10$CwTycUXWue0Thq9StjUM0u') })
                        .then(data => console.log(data))}>
                    Register
                </button>
            </div>
        </div>
    )
}