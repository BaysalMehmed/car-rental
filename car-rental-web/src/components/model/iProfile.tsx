import iVehicle from "./iVehicle"

export default interface iProfile{

    firstName: String
    surname: String
    email: String
    phoneNumber: String
    vehicles?: iVehicle[]
}