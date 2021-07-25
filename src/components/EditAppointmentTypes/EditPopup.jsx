import React, { useState, useEffect } from 'react';
import { CirclePicker } from 'react-color';
import {
  Button,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@material-ui/core';
import { patchAppointmentType } from '../../requestsService/appointmentsTypes';

function EditPopup(props) {
  const [pickedColor, setPickedColor] = useState('');
  const [typedTypeName, setTypedTypeName] = useState('');
  const [typedTypePrice, setTypedTypePrice] = useState('');

  useEffect(() => {
    setTypedTypeName(props.type?.label);
    setTypedTypePrice(props.type?.price);
    setPickedColor(props.type?.color);
  }, [props.type?.label, props.type?.price, props.type?.color]);

  const handlePopupClose = () => {
    setTypedTypeName(props.type?.label);
    setTypedTypePrice(props.type?.price);
    setPickedColor(props.type?.color);
    props.onClose();
  };

  const updateAppointmentType = async () => {
    const updatedType = {
      label: typedTypeName,
      doctor: props.type.doctor,
      color: pickedColor,
      price: typedTypePrice,
    };
    await patchAppointmentType(props.type.id, updatedType);

    handlePopupClose();
    props.loadAppointmentsTypes();
  };

  return (
    <Dialog open={props.popupOpen} onClose={() => handlePopupClose()}>
      <div className="create-type-popup-container">
        <DialogTitle>Edytuj typ wizyty</DialogTitle>
        <DialogContent className="create-type-popup-body">
          <div className="create-type-popup-element">
            <Typography className="create-type-label">Nazwa</Typography>
            <TextField
              className="create-type-input"
              type="text"
              value={typedTypeName}
              onChange={({ target: { value } }) => setTypedTypeName(value)}
            />
          </div>
          <div className="create-type-popup-element">
            <Typography className="create-type-label">Cena</Typography>
            <TextField
              className="create-type-input"
              type="text"
              value={typedTypePrice}
              onChange={({ target: { value } }) => setTypedTypePrice(value)}
            />
          </div>

          <div className="create-type-popup-element">
            <Typography className="create-type-label">Kolor</Typography>
            <CirclePicker
              className="type-color"
              circleSpacing={10}
              circleSize={28}
              width={350}
              value={pickedColor}
              onChange={(e) => {
                setPickedColor(e.hex);
              }}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => updateAppointmentType()}
          >
            Zatwierdź
          </Button>
        </DialogContent>
      </div>
    </Dialog>
  );
}

export default EditPopup;
