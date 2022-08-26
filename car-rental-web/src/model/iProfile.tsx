import iVehicle from "./iVehicle"

export default interface iProfile{

    firstName: string
    surname: string
    email: string
    phoneNumber: string
    vehicles?: iVehicle[]
    password: string    
}