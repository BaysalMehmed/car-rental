import { useEffect, useState } from "react"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap"
import ReactSelect from "react-select"
import iVehicle from "../../model/iVehicle"
import { addVehicle, getAllBrands } from "../../service/VehicleService"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import iAvailability from "../../model/iAvailability"

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

    const [brands, setBrands] = useState<iBrand[]>([])
    const [vehicleToAdd, setVehicleToAdd] = useState<iVehicle>( {} as iVehicle)
    const [availabilities, setAvailabilities] = useState<iAvailability[]>([])

    useEffect(() => {
        getAllBrands().then(brands => setBrands(brands)).catch(err => console.log(err))
    }, [])

    function getBrands() {
        return brands.map(brand => { return { label: brand.name, value: brand.name } })
    }

    function getModels() {
        return brands.filter(brand => brand.name === vehicleToAdd.brand).at(0)?.models.map(model => { return { label: model.name, value: model.name } })
    }

    function getTrims() {
        return brands.filter(brand => brand.name === vehicleToAdd.brand).at(0)?.models.filter(model => model.name === vehicleToAdd.model).at(0)?.trims.map(trim => { return { label: trim.name, value: trim.name } })
    }

    function submit() {
        console.log(availabilities)
        setVehicleToAdd({...vehicleToAdd, availability: availabilities})
        vehicleToAdd.availability = availabilities
        addVehicle(vehicleToAdd).then(() => { setShow(false); forceParentRefresh() }).catch(err => console.log(err))
    }

    function addAvail() {
        setAvailabilities([...availabilities, { startDate: new Date(), endDate: null }])
    }

    function removeAvail(index: number) {
        availabilities.splice(index, 1)
        setAvailabilities([...availabilities])
    }

    function setStartDate(index: number, date: Date | null) {
        availabilities[index].startDate = date
        setAvailabilities([...availabilities])
    }

    function setEndDate(index: number, date: Date | null) {
        availabilities[index].endDate = date
        setAvailabilities([...availabilities])
    }

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <ModalHeader closeButton>Add Vehicle</ModalHeader>
            <ModalBody>
                <ReactSelect isClearable className="react-select" placeholder='Brand' options={getBrands()} onChange={option => setVehicleToAdd({ ...vehicleToAdd, brand: option !== null ? option.value : "" })} />
                <ReactSelect isClearable className="react-select" placeholder='Model' options={getModels()} onChange={option => setVehicleToAdd({ ...vehicleToAdd, model: option !== null ? option.value : "" })} />
                <ReactSelect isClearable className="react-select" placeholder='Trim' options={getTrims()} onChange={option => setVehicleToAdd({ ...vehicleToAdd, trim: option !== null ? option.value : "" })} />
                <input style={{ width: "100%", marginBottom: "5px" }} placeholder="Colour" onChange={(input) => setVehicleToAdd({ ...vehicleToAdd, colour: input.currentTarget.value })} />
                <input style={{ width: "100%", marginBottom: "5px" }} placeholder="Year" onChange={(input) => setVehicleToAdd({ ...vehicleToAdd, year: parseInt(input.currentTarget.value) })} />
                <input style={{ width: "100%", marginBottom: "10px" }} placeholder="Number Plate" onChange={(input) => setVehicleToAdd({ ...vehicleToAdd, numberPlate: input.currentTarget.value })} />

                <div id='avails'>
                    {availabilities.length > 0 && availabilities.map((avail, idx) => {
                        return <>
                            <DatePicker
                                selected={avail.startDate}
                                onChange={(date) => setStartDate(idx, date)}
                                placeholderText="Start Date"
                                showTimeSelect
                                dateFormat={"dd/MM/yyyy"}
                                
                            />
                            <DatePicker
                                selected={avail.endDate}
                                onChange={(date) => setEndDate(idx, date)}
                                placeholderText="End Date"
                                showTimeSelect
                                dateFormat={"dd/MM/yyyy"}
                            />
                            <Button onClick={() => removeAvail(idx)}>Delete</Button>
                        </>
                    })}

                </div>
                <Button style={{ width: "100%", marginBottom: "5px" }} onClick={() => addAvail()}>Add Availability</Button>

            </ModalBody>
            <ModalFooter>
                <Button onClick={() => submit()}>Add</Button>
                <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}