import { useEffect, useState } from "react"
import { Button, Card, Modal, ModalBody, ModalFooter, ModalHeader, Table } from "react-bootstrap"
import iVehicle from "../../model/iVehicle"
import { deleteVehicle, getVehicles } from "../../service/VehicleService"
import AddVehicle from "../AddVehicle"
import ViewVehicle from "../ViewVehicle"

export default function MyVehicles() {

    const [vehicles, setVehicles] = useState<iVehicle[]>()
    const [showAddVehicleModal, setShowAddVehicleModal] = useState<boolean>(false)
    const [showViewVehicleModal, setShowViewVehicleModal] = useState<boolean>(false)
    const [vehicleToView, setVehicleToView] = useState<iVehicle>()

    const [refresh, setRefresh] = useState<boolean>(false)

    useEffect(() => {
        getVehicles().then(vehicles => setVehicles(vehicles)).catch(ex => console.log(ex))
    }, [refresh])

    function set(vehicle: iVehicle){
        setVehicleToView(vehicle)
        setShowViewVehicleModal(true)
    }

    return <>

        <Button style={{ float: "right" }} onClick={() => setShowAddVehicleModal(true)}>Add Vehicle</Button>
        <AddVehicle show={showAddVehicleModal} setShow={setShowAddVehicleModal} forceParentRefresh={() => setRefresh(!refresh)} />
        
        {vehicleToView !== undefined && <ViewVehicle show={showViewVehicleModal} setShow={setShowViewVehicleModal} vehicleToView={vehicleToView}/>}

        {vehicles?.map((vehicle, idx) => {
            return (
                <Card className="card-format" style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={"http://localhost:8080/vehicle/image/" + vehicle.imageNames[0]} />
                    <Card.Body>
                        <Card.Title>{vehicle.brand + " " + vehicle.model + " " + vehicle.trim}</Card.Title>
                        <Card.Text>
                            {vehicle.numberPlate}
                        </Card.Text>
                        <Button style={{marginRight:"5px"}} onClick={()=> set(vehicle)}>View</Button>
                        <Button onClick={() => { deleteVehicle(vehicle.numberPlate).then(() => setRefresh(!refresh)) }}>Delete</Button>
                    </Card.Body>
                </Card>
            )
        })}
    </>
}