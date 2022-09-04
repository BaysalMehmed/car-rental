import { json } from "stream/consumers"
import iAvailability from "../model/iAvailability"
import iVehicle, { iBrand } from "../model/iVehicle"

export async function getAllBrands(): Promise<iBrand[]> {
    return await fetch("http://localhost:8080/vehicle/brands").then(data => data.json())
}

export async function getVehicles(): Promise<iVehicle[]> {
    return await fetch("http://localhost:8080/vehicle").then(data => data.json())
}

export async function addVehicle(vehicle: iVehicle, images: FileList|null): Promise<iVehicle> {

    const formData = new FormData()
    formData.append("vehicle", JSON.stringify(vehicle))

    if(images !== null){
        for(let i =0; i<images.length; i++){
            formData.append("files", images[i])
        }
    }
    

    const requestOptions = {
        method: "POST",
        body: formData
    }

    return await fetch("http://localhost:8080/vehicle", requestOptions).then(data => data.json())
}

export async function deleteVehicle(numberPlate: String): Promise<iVehicle> {

    return await fetch("http://localhost:8080/vehicle/" + numberPlate, {method: "DELETE"}).then(data => data.json())
}

export async function updateAvailability(numberPlate: String, availabilities: iAvailability[]): Promise<iAvailability[]>{
    return await fetch("http://localhost:8080/vehicle/" + numberPlate + "/availability", {method: "PUT", headers: { 'Content-Type': 'application/json' },  body: JSON.stringify(availabilities)}).then(data => data.json())
}