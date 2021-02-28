import React, {useState, useContext, useEffect} from 'react';
import { Button } from "../Button/Button";
import Editable from "./Editable"
import { UserContext } from "../../contexts/UserContext"
import Popup from "reactjs-popup";
import { FaSquare, FaCircle } from 'react-icons/fa';
import "./Settings.css";
import { CirclePicker, TwitterPicker, GithubPicker } from 'react-color';


function Settings() {

    const [task, setTask] = useState("")
    const [appointmentsTypes, setAppointmentsTypes] = useState()
    const [popupOpen, setPopupOpen] = useState(false)
    const { user, setUser } = useContext(UserContext)
    const [pickedColor, setPickedColor] = useState("")
    const [typedTypeName, setTypedTypeName] = useState("")
    const [typedTypePrice, setTypedTypePrice] = useState("")

    useEffect(() => {
        loadAppointmentsTypes()
      }, []);

    
    const loadAppointmentsTypes = async () => {
    const response = await fetch(`/api/appointmentsTypes/${user}`);
    const data = await response.json();
    const types = data.map(type => ({
        id: type._id,
        label: type.label,
        doctor: type.doctor,
        color: type.color,
        price: type.price
    }))
    console.log(types)
    setAppointmentsTypes(types)
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
                doctor: user,
                color: pickedColor,
                price: typedTypePrice,
              }),
            });
            handlePopupClose()
            loadAppointmentsTypes()
        } else {
            window.alert("Nie podano wszystkich danych");
        }
    }

    const handleEditTypeButton = () => {
        
    }

    const handlePopupClose = () => {
        setPopupOpen(false)
        setTypedTypeName("")
        setTypedTypePrice("")
        setPickedColor("")
    }


    return (
        <div>
            <div className="edit-container">
                <div className="edit-header">Typy wizyt</div>
                {
                    appointmentsTypes?.map(type =>
                        <tr>
                        <td className="TypesTableCell">
                            {type.label}
                        </td>
                        <td className="TypesTableCell">
                            <FaSquare style={{color: type.color}}/>
                        </td>
                        <td className="TypesTableCell">
                            {type.price} zł
                        </td>
                        </tr>
                    )
                }
                <span className="type-edit-buttons">
                    <Button onClick={() => handleEditTypeButton()}>Edytuj</Button>
                    <Button onClick={() => setPopupOpen(true)}>+</Button>
                </span>
                
            </div>
            <div>
            <Popup
                modal
                open={popupOpen}
                onClose={() => handlePopupClose()}
                contentStyle={{ width: "488px" }}
            >
                <div className="create-type-popup-container">
                    <h1>Dodaj typ wizyty</h1>
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
                    <Button onClick={() => handleAddTypeButton()}>Dodaj</Button>
                </div>
            </Popup>
            </div>
            
        </div>
    )
}

export default Settings
