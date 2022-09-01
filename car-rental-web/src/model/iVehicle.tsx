import iAvailability from "./iAvailability"

export default interface iVehicle{

    brand: String
    model: String
    trim: String
    colour: String
    year: number
    numberPlate: String
    availability: iAvailability[]
    imageNames: String[]
}

export interface iBrand {
    name: String
    models: iModel[]
}

interface iModel {
    name: String
    trims: iTrim[]
}

interface iTrim {
    name: String
}