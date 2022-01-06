import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { FaSquare } from "react-icons/fa";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import "./EditAppointmentTypes.css";
import EditPopup from "./EditPopup";
import AddPopup from "./AddPopup";
import { Button, Paper } from "@material-ui/core";
import { getAppointmentsTypes } from "../../requestsService/appointmentsTypes";

export default function EditAppointmentTypes() {
  const { user } = useContext(UserContext);
  const [appointmentsTypes, setAppointmentsTypes] = useState();
  const [addPopupOpen, setAddPopupOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedType, setSelectedType] = useState();
  const [editPopupOpen, setEditPopupOpen] = useState(false);

  useEffect(() => {
    loadAppointmentsTypes();
  }, []);

  const loadAppointmentsTypes = async () => {
    const data = await getAppointmentsTypes();
    const types = data?.map((type) => ({
      id: type._id,
      label: type.label,
      doctor: type.doctor,
      color: type.color,
      price: type.price,
    }));
    setAppointmentsTypes(types);
  };

  //DANGEROUS
  //usunięcie typu psuje wizyty które mają ten typ
  const handleDeleteTypeButton = async (type) => {
    // deleteAppointmentType(type.id);
    // loadAppointmentsTypes()
    window.alert("Usuwanie jest niedostępne, skontaktuj się z administratorem");
  };

  const handleEditTypeButton = (type) => {
    setSelectedType(type);
    setEditPopupOpen(true);
  };

  const handleAddPopupClose = () => {
    setAddPopupOpen(false);
  };

  const handleEditPopupClose = () => {
    setEditPopupOpen(false);
  };

  return (
    <div>
      <Paper className="edit-container">
        <div className="edit-header">Typy wizyt</div>
        <table className="types-table">
          {appointmentsTypes?.map((type, index) => (
            <tr>
              <td className="type-table-cell">{type.label}</td>
              <td className="type-table-cell">
                <FaSquare style={{ color: type.color }} />
              </td>
              <td className="type-table-cell">{type.price} zł</td>
              {editOpen ? (
                <td className="type-table-cell delete-edit-type">
                  <BiEditAlt onClick={() => handleEditTypeButton(type)} />
                </td>
              ) : null}
              {editOpen ? (
                <td className="type-table-cell delete-edit-type">
                  <BiTrash onClick={() => handleDeleteTypeButton(type)} />
                </td>
              ) : null}
            </tr>
          ))}
        </table>
        <span className="type-edit-buttons">
          <Button
            variant="contained"
            color="primary"
            onClick={() => (editOpen ? setEditOpen(false) : setEditOpen(true))}
          >
            {editOpen ? "Zakończ" : "Edytuj"}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setAddPopupOpen(true)}
          >
            +
          </Button>
        </span>
      </Paper>
      <AddPopup
        popupOpen={addPopupOpen}
        onClose={handleAddPopupClose}
        user={user.id}
        loadAppointmentsTypes={loadAppointmentsTypes}
      />
      <EditPopup
        popupOpen={editPopupOpen}
        onClose={handleEditPopupClose}
        type={selectedType}
        loadAppointmentsTypes={loadAppointmentsTypes}
      />
    </div>
  );
}
