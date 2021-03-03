import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {}
  });

  const setDay = function (newDay) {
    setState({...state, day: newDay});
  }

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, [])

  function bookInterview(id, interview) {

    const newAppointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {...state.appointments};
    appointments[id] = newAppointment;

    return axios.put(`/api/appointments/${id}`, appointments[id])
    .then((res) => {
      if (res.status === 204) {
        setState({
          ...state, 
          appointments: appointments
        });
      }
    });
  }

  function cancelInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const deleteAppt = {...state.appointments, [id]: appointment};

    return axios.delete(`/api/appointments/${id}`)
    .then((res) => {
      if (res.status === 204) {
        setState({
          ...state, 
          deleteAppt
        });
      }
    });
  }
  return {state, setDay, bookInterview, cancelInterview}
}