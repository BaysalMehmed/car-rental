import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Tab, Tabs } from "react-bootstrap"
import iVehicle from "../../model/iVehicle"
import "react-datepicker/dist/react-datepicker.css";
import AvailabilityEditor from "../AvailabilityEditor";
import { useState } from "react";
import iAvailability from "../../model/iAvailability";
import { updateAvailability } from "../../service/VehicleService";

interface iViewVehicle {
    show: boolean
    setShow: Function
    vehicleToView: iVehicle
}


export default function ViewVehicle(props: iViewVehicle) {

    const { show, setShow, vehicleToView } = props

    const { brand, model, trim, colour, year, numberPlate, availability } = vehicleToView

    const [availabilityState, setAvailabilityState] = useState<iAvailability[]>(availability)

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <ModalHeader closeButton>{brand + " " + model + " " + trim}</ModalHeader>
            <ModalBody>
                <Tabs
                    defaultActiveKey="details"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="details" title="Details">
                        <p>{colour}</p>
                        <p>{year}</p>
                        <p>{numberPlate}</p>

                    </Tab>
                    <Tab eventKey="availability" title="Availability">
                        <AvailabilityEditor availabilities={availabilityState} setInheritAvailabilities={setAvailabilityState}/>
                    </Tab>
                </Tabs>
                <Button onClick={() => {
                    updateAvailability(numberPlate, availabilityState).then(data => console.log(data))
                }}>Save</Button>
            </ModalBody>
            <ModalFooter>
            </ModalFooter>
        </Modal>
    )
}