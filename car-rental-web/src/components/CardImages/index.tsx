import { useState } from "react";
import { Button, Card } from "react-bootstrap";

interface iCardImages{
    imageNames: String[]
}

export default function CardImages(props: iCardImages){

    const [imageIndex, setImageIndex] = useState<number>(0)

    const {imageNames} = props

    return <>
    
    <Card.Img variant="top" src={"http://localhost:8080/vehicle/image/" + imageNames[imageIndex]} />
    
    {imageIndex - 1 >= 0 &&<Button className='prev-image' onClick={() => setImageIndex(imageIndex - 1)}>{"<<"}</Button> }
    {imageIndex + 1 < imageNames.length &&<Button className='next-image' onClick={() => setImageIndex(imageIndex + 1)}>{">>"}</Button> }
    </>
}