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

  // helper function to find specific day
  function findDays(day) {
    const days = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4
    }
    return days[day];
  }

  function bookInterview(id, interview) {

    const newAppointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {...state.appointments};
    appointments[id] = newAppointment;

    // console.log("state.day is", state.day)

    // call helper function to convert day string into number
    const dayOfTheWeek = findDays(state.day)

    let updatedDay = {}
    // console.log(state.appointments)

    // if statement to see if interview value is null. It is null if there is interview booked. If interview is booked, reduce spots by 1
    if (state.appointments[id].interview) {
      updatedDay = {
        ...state.days[dayOfTheWeek],
        spots: state.days[dayOfTheWeek].spots
      } 
    } else {
      updatedDay = {
        ...state.days[dayOfTheWeek],
        spots: state.days[dayOfTheWeek].spots - 1
      } 
    }

    let days = state.days
    days[dayOfTheWeek] = updatedDay;

    //console.log(days)
    //console.log("days of week", days[dayOfWeek])

    return axios.put(`/api/appointments/${id}`, appointments[id])
    .then((res) => {
      if (res.status === 204) {
        setState({
          ...state, 
          appointments: appointments,
          days: days
        });
      }
    });
  }

  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const deleteAppt = {
      ...state.appointments, 
      [id]: appointment
    };

    console.log(deleteAppt)

    const dayOfTheWeek = findDays(state.day)

    let updatedDay = {
      ...state.days[dayOfTheWeek],
      spots: state.days[dayOfTheWeek].spots + 1
    }

    let days = state.days
    days[dayOfTheWeek] = updatedDay;

    return axios.delete(`/api/appointments/${id}`)
    .then((res) => {
      if (res.status === 204) {
        setState({
          ...state, 
          appointments: deleteAppt,
          days: days
        });
      }
    });
  }
  return {state, setDay, bookInterview, cancelInterview}
}