import iAvailability from "../../model/iAvailability"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "react-bootstrap";


interface iAvailabilityEditor {
    availabilities: iAvailability[]
    setInheritAvailabilities: Function
}

export default function AvailabilityEditor(props: iAvailabilityEditor) {

    const {availabilities, setInheritAvailabilities} = props

    function addAvail() {
        const newAvail = [...availabilities, { startDate: new Date(), endDate: null }]
        setInheritAvailabilities(newAvail)
    }

    function removeAvail(index: number) {
        availabilities.splice(index, 1)
        setInheritAvailabilities([...availabilities])
    }

    function setStartDate(index: number, date: Date | null) {
        availabilities[index].startDate = date
        setInheritAvailabilities([...availabilities])
    }

    function setEndDate(index: number, date: Date | null) {
        availabilities[index].endDate = date
        setInheritAvailabilities([...availabilities])
    }

    return (
        <>
            <div id='avails'>
                {availabilities.length > 0 && availabilities.map((avail, idx) => {
                    return <div style={{marginBottom: "5px"}}>
                        <DatePicker
                            selected={avail.startDate}
                            onChange={(date) => setStartDate(idx, date)}
                            placeholderText="Start Date"
                            showTimeSelect
                            dateFormat={"dd/MM/yyyy"}

                        />
                        <DatePicker
                            selected={avail.endDate}
                            onChange={(date) => setEndDate(idx, date)}
                            placeholderText="End Date"
                            showTimeSelect
                            dateFormat={"dd/MM/yyyy"}
                        />
                        <Button onClick={() => removeAvail(idx)}>Delete</Button>
                    </div>
                })}


            </div>
            <Button style={{ width: "100%", marginBottom: "5px", marginTop: "5px" }} onClick={() => addAvail()}>Add Availability</Button>
        </>
    )
} 