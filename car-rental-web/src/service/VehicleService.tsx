import iVehicle from "../model/iVehicle";

export async function getVehicles(): Promise<iVehicle[]>{
    return await fetch("http://localhost:8080/vehicle").then(data => data.json())
}