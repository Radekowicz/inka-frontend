import React, { useState, useEffect, useContext } from "react";
import "./Calbar.scss";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/pl";
import CustomEvent from "./CustomEvent/CustomEvent";
import Popup from "reactjs-popup";
// import "reactjs-popup/dist/index.css";
import {
  Button,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import { UserContext } from "../../contexts/UserContext";
import { getPatients } from "../../requestsService/patients";
import { postAppointment } from "../../requestsService/appointments";
import { getAppointmentsTypes } from "../../requestsService/appointmentsTypes";
import CustomToolbar from "./CustomToolbar/CustomToolbar";
import { messages, formats, customStyles } from "./calendarSettings";
import Autocomplete from "@material-ui/lab/Autocomplete";

const localizer = momentLocalizer(moment);

export default function Calbar(props) {
  const { user } = useContext(UserContext);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [patientOptions, setPatientOptions] = useState([]);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [patientValue, setPatientValue] = useState(null);
  const [appointmentsTypes, setAppointmentsTypes] = useState([]);

  useEffect(() => {
    loadPatientOptions();
    loadAppointments();
    loadAppointmentsTypes();
  }, []);

  const loadAppointmentsTypes = async () => {
    const data = await getAppointmentsTypes(user);
    const types = data?.map((type) => ({
      id: type._id,
      label: type.label,
      doctor: type.doctor,
      color: type.color,
    }));
    setAppointmentsTypes(types);
  };

  const loadPatientOptions = async () => {
    const data = await getPatients();
    const patients = data?.map((patient) => ({
      value: `${patient._id}`,
      label: `${patient.firstName} ${patient.lastName}`,
    }));
    setPatientOptions(patients);
  };

  const loadAppointments = async () => {
    props.loadAppointments();
  };

  const handleSelect = async (title, patient) => {
    if (title && patient) {
      await postAppointment({
        type: title.id,
        patient: patient.value,
        doctor: user.id,
        startDate: start,
        endDate: end,
      });
      loadAppointments();
    } else {
      window.alert("Nie podano wszystkich danych");
    }
    setSelectedOption(null);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const backgroundColor = appointmentsTypes.find(
      (type) => event.type === type.label
    )?.color;

    const style = {
      backgroundColor: backgroundColor,
      borderRadius: "0px",
      opacity: 0.6,
      color: "white",
      border: "0px",
      display: "block",
      padding: "7px",
    };
    return {
      style: style,
    };
  };
  const onSelectSlot = ({ start, end }) => {
    setPopupOpen(true);
    setStart(start);
    setEnd(end);
  };

  const scrollToTime = new Date(new Date().setHours(new Date().getHours() - 3));

  return (
    <div className="App">
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        // scrollToTime={scrollToTime}
        step={15}
        defaultView="day"
        events={props.events}
        style={{ height: "calc(100vh - 50px)" }}
        messages={messages}
        selectable={true}
        views={["month", "week", "day"]}
        formats={formats}
        onSelectSlot={onSelectSlot}
        onSelectEvent={props.handleEventClick}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CustomEvent,
          toolbar: CustomToolbar,
        }}
      />

      <div>
        <Dialog open={popupOpen} onClose={() => setPopupOpen(false)}>
          <div className="popup">
            <div className="input">
              <Autocomplete
                options={patientOptions}
                getOptionLabel={(option) => option.label}
                style={{ width: 300 }}
                onChange={(event, newValue) => setPatientValue(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Pacjent" variant="outlined" />
                )}
              />
            </div>
            <div className="input">
              <Autocomplete
                options={appointmentsTypes}
                getOptionLabel={(option) => option.label}
                style={{ width: 300 }}
                onChange={(event, newValue) => setSelectedOption(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Rodzaj wizyty"
                    variant="outlined"
                  />
                )}
              />
            </div>
            <div className="buttonn">
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setPopupOpen(false);
                  handleSelect(selectedOption, patientValue);
                }}
              >
                Dodaj wizytę
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
}
