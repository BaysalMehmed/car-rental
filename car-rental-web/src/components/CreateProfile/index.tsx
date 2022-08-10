import { useEffect, useState } from "react"
import iProfile from "../model/iProfile"
import { createProfile, getProfile } from "../service/ProfileService"


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
                    <label htmlFor="firstName">First Name: </label>
                    <input type="text" id="firtName" onChange={(value => setFirstName(validate(value.target.value, value.target.value.length >= 5, "First Name must contain more than 4 characters")))} />
                    <b className="error-text"> {firstName.error && firstName.error}</b>
                </div>
                <div><label htmlFor="surname">Surname: </label>
                    <input type="text" id="surname" onChange={(value => setSurname(validate(value.target.value, value.target.value.length >= 5, "Surname must contain more than 4 characters")))} />
                    <b className="error-text"> {surname.error && surname.error}</b>
                    </div>
                <div><label htmlFor="email">Email: </label>
                    <input type="text" id="email" onChange={(value => setEmail(validate(value.target.value, value.target.value.includes("@"), "Must be a valid email")))} />
                    <b className="error-text"> {email.error && email.error}</b>
                    </div>
                <div><label htmlFor="phoneNumber">Phone Number: </label>
                    <input type="text" id="phoneNumber" onChange={(value => setPhoneNumber(validate(value.target.value, true, "Must be a valid email")))} />
                    <b className="error-text"> {phoneNumber.error && phoneNumber.error}</b>
                    </div>
            </>

        )
    }

    return (<>
        {getForm()}
        <div><button disabled={firstName.error !== "" || surname.error !== "" || email.error !== "" || phoneNumber.error !== ""}
            onClick={() => createProfile({ firstName: firstName.value, surname: surname.value, email: email.value, phoneNumber: phoneNumber.value })
                .then(data => console.log(data))}>
            Submit
        </button>
        </div>
    </>)
}