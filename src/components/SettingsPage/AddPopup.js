import React, { useState, useEffect } from 'react';
import Popup from "reactjs-popup";
import { CirclePicker } from 'react-color';
import { Button } from "../Button/Button";

function AddPopup (props) {

    const [pickedColor, setPickedColor] = useState("")
    const [typedTypeName, setTypedTypeName] = useState("")
    const [typedTypePrice, setTypedTypePrice] = useState("")


    const handlePopupClose = () => {
        setTypedTypeName("");
        setTypedTypePrice("");
        setPickedColor("")
        props.onClose()
    }

    const handleAddTypeButton = async () => {
        if(pickedColor && typedTypeName && typedTypePrice) {
            await fetch("/api/appointmentsTypes", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                label: typedTypeName,
                doctor: props.user,
                color: pickedColor,
                price: typedTypePrice,
              }),
            });
            //handlePopupClose()
            props.loadAppointmentsTypes()
        } else {
            window.alert("Nie podano wszystkich danych");
        }
        handlePopupClose()
    }


    return (
        <Popup
        modal
        open={props.popupOpen}
        onClose={() => handlePopupClose()}
        contentStyle={{ width: "488px" }}
        >
            <div className="create-type-popup-container">
                    <h1>Dodaj typ wizyty</h1>
                    <div className="create-type-popup-element">
                        <label className="create-type-label">Nazwa</label>
                        <input 
                            className="create-type-input"
                            placeholder={"Wizyta kontrolna"}
                            type="text"
                            value={typedTypeName}
                            onChange={({target:{value}}) => setTypedTypeName(value)}
                        />
                    </div>
                    <div className="create-type-popup-element">
                        <label className="create-type-label">Cena</label>
                        <input 
                            className="create-type-input"
                            placeholder={"200"} 
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
                    <Button onClick={() => handleAddTypeButton()}>Dodaj</Button>
                </div>
        </Popup>
    )
}

export default AddPopup