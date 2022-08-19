import { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap"
import iVehicle from "../../model/iVehicle"
import { getVehicles } from "../../service/VehicleService"

export default function MyVehicles(){

    const [vehicles, setVehicles] = useState<iVehicle[]>()

    useEffect(()=> {
        getVehicles().then(vehicles => setVehicles(vehicles)).catch(ex => console.log(ex))
    }, [])

    return <>

<Table>
        <thead>
            <tr>
                
        <th>Brand</th>
        <th>Model</th>
        <th>Trim</th>
        <th>Colour</th>
        <th>Year</th>
        <th>Number Plate</th>
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
            </tr>)
    })}
    
            
        </tbody>

    </Table>
    </>
}