import React, { useState } from 'react';
import { CirclePicker } from 'react-color';
import {
  Button,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@material-ui/core';

import { postAppointmentType } from '../../requestsService/appointmentsTypes';

export default function AddPopup(props) {
  const [pickedColor, setPickedColor] = useState('');
  const [typedTypeName, setTypedTypeName] = useState('');
  const [typedTypePrice, setTypedTypePrice] = useState('');

  const handlePopupClose = () => {
    setTypedTypeName('');
    setTypedTypePrice('');
    setPickedColor('');
    props.onClose();
  };

  const handleAddTypeButton = async () => {
    if (pickedColor && typedTypeName && typedTypePrice) {
      const newType = {
        label: typedTypeName,
        doctor: props.user,
        color: pickedColor,
        price: typedTypePrice,
      };
      await postAppointmentType(newType);
      //handlePopupClose()
      props.loadAppointmentsTypes();
    } else {
      window.alert('Nie podano wszystkich danych');
    }
    handlePopupClose();
  };

  return (
    <Dialog open={props.popupOpen} onClose={() => handlePopupClose()}>
      <div className="create-type-popup-container">
        <DialogTitle>Dodaj typ wizyty</DialogTitle>
        <DialogContent className="create-type-popup-body">
          <div className="create-type-popup-element">
            <Typography className="create-type-label">Nazwa</Typography>
            <TextField
              className="create-type-input"
              placeholder="Wizyta kontrolna"
              type="text"
              // label="Nazwa"
              value={typedTypeName}
              onChange={({ target: { value } }) => setTypedTypeName(value)}
            />
          </div>
          <div className="create-type-popup-element">
            <Typography className="create-type-label">Cena</Typography>
            <TextField
              className="create-type-input"
              placeholder="200"
              type="text"
              // label="Cena"
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
              width={346}
              value={pickedColor}
              onChange={(e) => {
                setPickedColor(e.hex);
              }}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleAddTypeButton()}
          >
            Dodaj
          </Button>
        </DialogContent>
      </div>
    </Dialog>
  );
}
