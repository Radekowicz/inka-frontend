import React from 'react';
import EditAppointmentTypes from '../../components/EditAppointmentTypes/EditAppointmentTypes';
import PostponeAppointment from '../../components/PostponeAppointment/PostponeAppointment';

export default function SettingsPage() {
  return (
    <div>
      <PostponeAppointment />
      <EditAppointmentTypes />
    </div>
  );
}
