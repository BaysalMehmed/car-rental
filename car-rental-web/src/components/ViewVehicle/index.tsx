import { Modal, ModalBody, ModalFooter, ModalHeader, Tab, Tabs } from "react-bootstrap"
import iVehicle from "../../model/iVehicle"
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO } from "date-fns";

interface iViewVehicle {
    show: boolean
    setShow: Function
    vehicleToView: iVehicle
}


export default function ViewVehicle(props: iViewVehicle) {

    const { show, setShow, vehicleToView } = props

    const { brand, model, trim, colour, year, numberPlate, availability } = vehicleToView

    console.log(availability)

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
                        {availability !== null && availability.map(a => {
                            console.log(new Date(a.startDate as Date))
                            return <p>{
                                (a.startDate !== null ? format(parseISO(a.startDate.toString()), "dd/MM/yyyy") : "")
                                + " - "
                                + (a.endDate !== null ? format(parseISO(a.endDate.toString()), "dd/MM/yyyy") : "")} </p>
                        })}
                    </Tab>
                </Tabs>
            </ModalBody>
            <ModalFooter>
            </ModalFooter>
        </Modal>
    )
}