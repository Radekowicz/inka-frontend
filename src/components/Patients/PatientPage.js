import React, {useState, useEffect} from 'react';
import moment from "moment";
import "./PatientPage.css";


const Detail = (props) => {
    return (
      <div className="detail">
        <span className="detail-title">{props.title}:</span>
        <span className="detail-info">{props.info}</span>
      </div>
    );
  };

  const Visit = (props) => {
    return (
        <div className="visit-component">
          <div>{props.appointment.type}</div>
          <div>
            Data wizyty:
            {moment(props.appointment.start).format(" DD-MM-YYYY").toLocaleString()}
          </div>
          <div>
            Godzina wizyty:
            {moment(props.appointment.start).format(" hh:mm").toLocaleString()}
          </div>
        </div>
    )
  }


function PatientPage({match}) {

    const patientId = match.params.patientId


    const [patient, setPatient] = useState()
    const [appointments, setAppointments] = useState()


    useEffect(() => {
        loadPatient()
        loadAppointments(patientId)
      }, []);



    const loadPatient = async () => {
        const response = await fetch(`/api/patients/${patientId}`);
        const patient = await response.json();
        const myPatient = {
          id: patient._id,
          firstName: patient.firstName,
          lastName: patient.lastName,
          birthdate: moment(patient.birthdate).format("DD.MM.YYYY"),
          firstAppointment: moment(patient.firstAppointment).format("MM/YYYY"),
          email: patient.email,
          phoneNumber: patient.phoneNumber,
          address: patient.address,
        };
        setPatient(myPatient)
      };

      const loadAppointments = async (patientId) => {
        console.log(patientId)
        const response = await fetch(`/api/appointments/${patientId}`);
        const data = await response.json();
        const appointments = data.map((appointment) => ({
          id: appointment._id,
          type: appointment.type.label,
          patient: appointment.patient,
          doctor: appointment.doctor,
          start: new Date(appointment.startDate),
          end: new Date(appointment.endDate),
          name: `${appointment.patient.firstName} ${appointment.patient.lastName}`,
        }))

        setAppointments(appointments)
      }

      const calcAge = (dateString) => {
        var birthday = +new Date(dateString);
        return ~~((Date.now() - birthday) / 31557600000);
      }

    return (
        <div>

        <div className="patient-info">
        <div className="patient">
          <div className="avatar">
            <i className="fas fa-user-circle patient-image" />
          </div>
          <div className="basic-info">
            <div>
              {patient?.firstName} {patient?.lastName} (
              {calcAge(patient?.birthdate)})
            </div>
            <div>
              Rozpoczęcie lecznia:{" "}
              {patient?.firstAppointment}
            </div>
          </div>
        </div>

        <div className="more-info">
          <Detail title="Email" info={patient?.email} />
          <Detail title="Telefon" info={patient?.phoneNumber} />
          <Detail title="Adres" info={patient?.address} />
        </div>
      </div>
            
      
        <tr><td colspan="8" className="visit-row">
        {
            appointments?.map((appointment, index) => <Visit appointment={appointment}/>)
        }
        </td>
        </tr>
              

        </div>
    )
}

export default PatientPage