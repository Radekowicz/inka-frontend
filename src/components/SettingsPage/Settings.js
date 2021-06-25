import React, {useState, useContext, useEffect} from 'react';
import { Button } from "../Button/Button";
import { UserContext } from "../../contexts/UserContext"
import { FaSquare, FaCircle } from 'react-icons/fa';
import { BiEditAlt, BiTrash } from 'react-icons/bi';
import "./Settings.css";
import EditPopup from "./EditPopup"
import AddPopup from "./AddPopup"

function Settings() {

    const { user, setUser } = useContext(UserContext)
    const [appointmentsTypes, setAppointmentsTypes] = useState()
    const [addPopupOpen, setAddPopupOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const [selectedType, setSelectedType] = useState()
    const [editPopupOpen, setEditPopupOpen] = useState(false)

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
        
    //DANGEROUS
    //usunięcie typu psuje wizyty które mają ten typ
    const handleDeleteTypeButton = async (type) => {
        // await fetch(`/api/appointmentsTypes/${type.id}`, {
        //     method: "DELETE",
        //     headers: {
        //       Accept: "application/json",
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //       }),
        // });        
        // loadAppointmentsTypes()
        window.alert("Usuwanie jest niedostępne, skontaktuj się z administratorem");
    }


    const handleEditTypeButton = (type) => {
        setSelectedType(type)
        setEditPopupOpen(true)
    }

    const handleAddPopupClose = () => {
        setAddPopupOpen(false)
    }

    const handleEditPopupClose = () => {
        setEditPopupOpen(false)
    }

    return (
        <div>
            <div className="edit-container">
                <div className="edit-header">Typy wizyt</div>
                <table className="types-table">
                {
                    appointmentsTypes?.map((type, index) =>
                        <tr>
                        <td className="type-table-cell">
                            {type.label}
                        </td>
                        <td className="type-table-cell">
                            <FaSquare style={{color: type.color}}/>
                        </td>
                        <td className="type-table-cell">
                            {type.price} zł
                        </td>
                        {
                            editOpen ? 
                            <td className="type-table-cell delete-edit-type">
                                <BiEditAlt onClick={() => handleEditTypeButton(type)}/>
                            </td> 
                            : null
                        }
                        {
                            editOpen ? 
                            <td className="type-table-cell delete-edit-type">
                                <BiTrash onClick={() => handleDeleteTypeButton(type)}/>
                            </td> 
                            : null
                        }
                        </tr>
                    )
                    }
                    </table>
                <span className="type-edit-buttons">
                    <Button onClick={() => editOpen ? setEditOpen(false) : setEditOpen(true)}>
                        { editOpen ? "Przestań edytować" : "Edytuj"}
                    </Button>
                    <Button onClick={() => setAddPopupOpen(true)}>+</Button>
                </span>
                
            </div>
            <AddPopup popupOpen={addPopupOpen} onClose={handleAddPopupClose} user={user} loadAppointmentsTypes={loadAppointmentsTypes}/>
            <EditPopup popupOpen={editPopupOpen} onClose={handleEditPopupClose} type={selectedType} loadAppointmentsTypes={loadAppointmentsTypes}/>
        </div>
    )
}

export default Settings
