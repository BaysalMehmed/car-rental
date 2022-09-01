import iVehicle, { iBrand } from "../model/iVehicle"

export async function getAllBrands(): Promise<iBrand[]> {
    return await fetch("http://localhost:8080/vehicle/brands").then(data => data.json())
}

export async function getVehicles(): Promise<iVehicle[]> {
    return await fetch("http://localhost:8080/vehicle").then(data => data.json())
}

export async function addVehicle(vehicle: iVehicle): Promise<iVehicle> {

    const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vehicle)
    }

    return await fetch("http://localhost:8080/vehicle", requestOptions).then(data => data.json())
}

export async function deleteVehicle(numberPlate: String): Promise<iVehicle> {

    return await fetch("http://localhost:8080/vehicle/" + numberPlate, {method: "DELETE"}).then(data => data.json())
}