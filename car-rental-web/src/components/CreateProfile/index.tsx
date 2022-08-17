import { useEffect, useState } from "react"
import iProfile from "../model/iProfile"
import { createProfile, getProfile } from "../service/ProfileService"
import { MdOutlineErrorOutline } from 'react-icons/md';


interface iFieldValidation {
    value: String
    error?: String
}


export default function CreateProfile() {

    const [firstName, setFirstName] = useState<iFieldValidation>({ value: "" })
    const [surname, setSurname] = useState<iFieldValidation>({ value: "" })
    const [email, setEmail] = useState<iFieldValidation>({ value: "" })
    const [phoneNumber, setPhoneNumber] = useState<iFieldValidation>({ value: "" })

    function validate(value: any, valid: boolean, error: String) {
        return { value: value, error: valid ? "" : error }

    }

    function getForm() {
        return (
            <>
                <div>
                    <input className="input-div double-field" placeholder="First Name" type="text" id="firtName" onChange={(value => setFirstName(validate(value.target.value, value.target.value.length >= 5, "First Name must contain more than 4 characters")))} />
                    <MdOutlineErrorOutline className="error-red error-icon"/>
                    <input className="input-div double-field" placeholder="Surname" type="text" id="surname" onChange={(value => setSurname(validate(value.target.value, value.target.value.length >= 5, "Surname must contain more than 4 characters")))} />
                </div>
                <div>
                    <input className="input-div" placeholder="Email" type="text" id="email" onChange={(value => setEmail(validate(value.target.value, value.target.value.includes("@"), "Must be a valid email")))} />

                </div>
                <div>
                    <input className="input-div" placeholder="Phone Number" type="text" id="phoneNumber" onChange={(value => setPhoneNumber(validate(value.target.value, true, "Must be a valid email")))} />

                </div>
            </>

        )
    }

    return (
        <div className="create-profile-container">
            {getForm()}
            <div>
                <button className="submit-button" disabled={firstName.error !== "" || surname.error !== "" || email.error !== "" || phoneNumber.error !== ""}
                    onClick={() => createProfile({ firstName: firstName.value, surname: surname.value, email: email.value, phoneNumber: phoneNumber.value })
                        .then(data => console.log(data))}>
                    Submit
                </button>
            </div>
        </div>
    )
}