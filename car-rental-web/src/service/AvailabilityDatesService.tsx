import iAvailability from "../model/iAvailability"
import iVehicle from "../model/iVehicle"

export function convertVehicleDates(vehicle: iVehicle): iVehicle{
    convertDates(vehicle.availability)
    return vehicle
}

export function convertVehicleListDates(vehicles: iVehicle[]): iVehicle[]{
    vehicles.map(vehicle => {
        convertDates(vehicle.availability)
    })
    return vehicles
}

export default function convertDates(availabilities: iAvailability[]): iAvailability[]{
    availabilities.forEach(avail => {
            if(avail.startDate !== null){
            avail.startDate = new Date(avail.startDate)
            }

            if(avail.endDate !== null){
            avail.endDate = new Date(avail.endDate)
            }
        })

        return availabilities
}