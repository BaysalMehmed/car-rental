import { useState } from "react"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap"
import ReactSelect from "react-select"
import iVehicle from "../../model/iVehicle"
import { addVehicle } from "../../service/VehicleService"

interface iAddVehicle {
    show: boolean
    setShow: Function
    forceParentRefresh: Function
}

interface iBrand {
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


export default function AddVehicle(props: iAddVehicle) {

    const { show, setShow, forceParentRefresh } = props

    const [vehicleToAdd, setVehicleToAdd] = useState<iVehicle>({} as iVehicle)

    const brands: iBrand[] = [
        {
            name: "Audi",
            models: [
                {
                    name: "A3",
                    trims: [
                        {
                            name: "Standard"
                        }
                    ]
                }, 
                {
                    name: "A4",
                    trims: [
                        {
                            name: "Perf"
                        }
                    ]
                }
            ]
        },
        {
            name: "Tesla",
            models: [
                {
                    name: "Model 3",
                    trims: [
                        {
                            name: "Rear Wheel"
                        },
                        {
                            name: "Long Range"
                        },
                        {
                            name: "Performance"
                        }
                    ]
                },
                {
                    name: "Model S",
                    trims: [
                        {
                            name: "Long Range"
                        },
                        {
                            name: "Plaid"
                        }
                    ]
                }
            ]
        }
    ]

    function getBrands() {
        return brands.map(brand => { return { label: brand.name, value: brand.name } })
    }

    function getModels(){
        return brands.filter(brand => brand.name === vehicleToAdd.brand).at(0)?.models.map(model =>  { return { label: model.name, value: model.name } })
    }

    function getTrims(){
        return brands.filter(brand => brand.name === vehicleToAdd.brand).at(0)?.models.filter(model => model.name === vehicleToAdd.model).at(0)?.trims.map(trim =>  { return { label: trim.name, value: trim.name } })
    }

    function submit() {
        addVehicle(vehicleToAdd).then(() => { setShow(false); forceParentRefresh() }).catch(err => console.log(err))
    }

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <ModalHeader closeButton>Add Vehicle</ModalHeader>
            <ModalBody>
                <ReactSelect isClearable className="react-select" placeholder='Brand' options={getBrands()} onChange={option => setVehicleToAdd({ ...vehicleToAdd, brand: option !== null ? option.value : "" })}/>
                <ReactSelect isClearable className="react-select" placeholder='Model' options={getModels()} onChange={option => setVehicleToAdd({ ...vehicleToAdd, model: option !== null ? option.value : "" })}/>
                <ReactSelect isClearable className="react-select" placeholder='Trim' options={getTrims()} onChange={option => setVehicleToAdd({ ...vehicleToAdd, trim: option !== null ? option.value : "" })}/>
                <input style={{ width: "100%", marginBottom: "5px" }} placeholder="Colour" onChange={(input) => setVehicleToAdd({ ...vehicleToAdd, colour: input.currentTarget.value })} />
                <input style={{ width: "100%", marginBottom: "5px" }} placeholder="Year" onChange={(input) => setVehicleToAdd({ ...vehicleToAdd, year: parseInt(input.currentTarget.value) })} />
                <input style={{ width: "100%", marginBottom: "5px" }} placeholder="Number Plate" onChange={(input) => setVehicleToAdd({ ...vehicleToAdd, numberPlate: input.currentTarget.value })} />
            </ModalBody>
            <ModalFooter>
                <Button onClick={() => submit()}>Add</Button>
                <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}