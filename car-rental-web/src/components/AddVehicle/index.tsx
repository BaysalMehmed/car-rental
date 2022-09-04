import { useEffect, useState } from "react"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap"
import ReactSelect from "react-select"
import iVehicle from "../../model/iVehicle"
import { addVehicle, getAllBrands } from "../../service/VehicleService"
import iAvailability from "../../model/iAvailability"
import AvailabilityEditor from "../AvailabilityEditor"

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
    const [selectedImage, setSelectedImage] = useState<FileList|null>(null)

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
        setVehicleToAdd({...vehicleToAdd, availability: availabilities})
        vehicleToAdd.availability = availabilities
        addVehicle(vehicleToAdd, selectedImage).then(() => { setShow(false); forceParentRefresh() }).catch(err => console.log(err))
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

                <input title="Choose Images" multiple type={"file"} onChange={(event) => { setSelectedImage(event.target.files)}}/>

                <AvailabilityEditor availabilities={availabilities} setInheritAvailabilities={setAvailabilities}/>

            </ModalBody>
            <ModalFooter>
                <Button onClick={() => submit()}>Add</Button>
                <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}