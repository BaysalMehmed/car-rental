import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Tab, Tabs, Image } from "react-bootstrap"
import iVehicle from "../../model/iVehicle"
import "react-datepicker/dist/react-datepicker.css";
import AvailabilityEditor from "../AvailabilityEditor";
import { useState } from "react";
import iAvailability from "../../model/iAvailability";
import { updateAvailability } from "../../service/VehicleService";
import convertDates from "../../service/AvailabilityDatesService";

interface iViewVehicle {
    show: boolean
    setShow: Function
    vehicleToView: iVehicle
    clearVehicleToView: Function
}


export default function ViewVehicle(props: iViewVehicle) {

    const { show, setShow, vehicleToView, clearVehicleToView} = props

    const { brand, model, trim, colour, year, numberPlate, imageNames, availability } = vehicleToView

    const [availabilityState, setAvailabilityState] = useState<iAvailability[]>(availability)

    function onClose(){
        setShow(false)
        clearVehicleToView()
    }

    return (
        <Modal show={show} onHide={() => onClose()}>
            <ModalHeader><b>{brand + " " + model + " " + trim}</b></ModalHeader>
            <ModalBody>
                <Tabs
                    defaultActiveKey="details"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="details" title="Details">
                        <p><b>Colour </b>{colour}</p>
                        <p><b>Year </b>{year}</p>
                        <p><b>Number Plate </b>{numberPlate}</p>

                    </Tab>
                    <Tab eventKey="images" title="Images">
                        {imageNames.map(image => {
                            return <Image style={{marginBottom: "5px", marginRight: "5px"}} width={"200px"} height={"120px"} src={"http://localhost:8080/vehicle/image/" + image}/>
                        })}
                        <input type="file"></input>

                    </Tab>
                    <Tab eventKey="availability" title="Availability">
                        <AvailabilityEditor availabilities={availabilityState} setInheritAvailabilities={setAvailabilityState}/>
                    </Tab>
                </Tabs>
            </ModalBody>
            <ModalFooter>
            <Button style={{float:"right"}} onClick={() => {
                    updateAvailability(numberPlate, availabilityState).then(data => setAvailabilityState(convertDates(data))).then(() => setShow(false))
                }}>Save</Button>
                <Button variant="secondary" style={{float:"right", marginRight: "5px"}} onClick={() => {
                    onClose()
                }}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}