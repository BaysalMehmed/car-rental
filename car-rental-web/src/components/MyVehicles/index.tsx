import { useEffect, useState } from "react"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Table } from "react-bootstrap"
import iVehicle from "../../model/iVehicle"
import { deleteVehicle, getVehicles } from "../../service/VehicleService"
import AddVehicle from "../AddVehicle"

export default function MyVehicles() {

    const [vehicles, setVehicles] = useState<iVehicle[]>()
    const [showAddVehicleModal, setShowAddVehicleModal] = useState<boolean>(false)
    const [refresh, setRefresh] = useState<boolean>(false)

    useEffect(() => {
        getVehicles().then(vehicles => setVehicles(vehicles)).catch(ex => console.log(ex))
    }, [refresh])

    return <>

        <Button style={{float:"right"}} onClick={() => setShowAddVehicleModal(true)}>Add Vehicle</Button>
        <AddVehicle show={showAddVehicleModal} setShow={setShowAddVehicleModal} forceParentRefresh={() => setRefresh(!refresh)}/>

        <Table>
            <thead>
                <tr>

                    <th>Brand</th>
                    <th>Model</th>
                    <th>Trim</th>
                    <th>Colour</th>
                    <th>Year</th>
                    <th>Number Plate</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {vehicles?.map(vehicle => {

                    return (
                        <tr>
                            <td>{vehicle.brand}</td>
                            <td>{vehicle.model}</td>
                            <td>{vehicle.trim}</td>
                            <td>{vehicle.colour}</td>
                            <td>{vehicle.year}</td>
                            <td>{vehicle.numberPlate}</td>
                            <td>
                                <Button onClick={() => {deleteVehicle(vehicle.numberPlate).then(() => setRefresh(!refresh))}}>Delete</Button>
                            </td>
                        </tr>)
                })}


            </tbody>

        </Table>
    </>
}