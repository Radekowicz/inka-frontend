import React, { useState, useEffect } from 'react';
import Popup from "reactjs-popup";
import { CirclePicker } from 'react-color';
import { Button } from "../Button/Button";

function EditPopup (props) {

    const [pickedColor, setPickedColor] = useState("")
    const [typedTypeName, setTypedTypeName] = useState("")
    const [typedTypePrice, setTypedTypePrice] = useState("")

    useEffect(() => {
        setTypedTypeName(props.type?.label);
        setTypedTypePrice(props.type?.price);
        setPickedColor(props.type?.color)
    }, [props.type?.label, props.type?.price, props.type?.color])

    const handlePopupClose = () => {
        setTypedTypeName("")
        setTypedTypePrice("")
        setPickedColor("")
        props.onClose()
    }

    const updateAppointmentType = async () => {
        await fetch(`/api/appointmentsTypes/${props.type.id}`, {
            method: "PATCH",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                label: typedTypeName,
                doctor: props.type.doctor,
                color: pickedColor,
                price: typedTypePrice,
              }),
        });
        handlePopupClose()
        props.loadAppointmentsTypes()
    }


    return (
        <Popup
        modal
        open={props.popupOpen}
        onClose={() => handlePopupClose()}
        contentStyle={{ width: "488px" }}
        >
            <div className="create-type-popup-container">
                    <h1>Edytuj typ wizyty</h1>
                    <div className="create-type-popup-element">
                        <label className="create-type-label">Nazwa</label>
                        <input 
                            className="create-type-input"
                            type="text"
                            value={typedTypeName}
                            onChange={({target:{value}}) => setTypedTypeName(value)}
                        />
                    </div>
                    <div className="create-type-popup-element">
                        <label className="create-type-label">Cena</label>
                        <input 
                            className="create-type-input"
                            type="text"
                            value={typedTypePrice}
                            onChange={({target:{value}}) => setTypedTypePrice(value)}
                        />
                    </div>
                    
                    <div className="create-type-popup-element">
                        <label className="create-type-label">Kolor</label>
                            <CirclePicker 
                                className="type-color" 
                                circleSpacing={10} 
                                circleSize={28} 
                                width={350} 
                                value={pickedColor} 
                                onChange={e => {setPickedColor(e.hex)}}
                            />
                    </div>
                    <Button onClick={() => updateAppointmentType()}>Zatwierdź</Button>
                </div>
        </Popup>
    )
}

export default EditPopup