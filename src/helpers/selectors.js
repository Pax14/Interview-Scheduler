export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const filteredDays = state.days.filter(singleDay => { 
    return singleDay.name === day
    })

  if (filteredDays.length === 0) {
    return [];
  }

  const appointments = filteredDays[0].appointments.map((app) => {
    return state.appointments[app]
  })

  return appointments;
}

export function getInterview(state, interview) {

  if (!interview) {
    return null;
  }

  const interviewerId = interview.interviewer;
  const interviewer = state.interviewers[interviewerId];
  return {...interview, interviewer: interviewer};
}

export function getInterviewersForDay(state, day) {
  //... returns an array of appointments for that day
  const filteredDays = state.days.filter(singleDay => { 
    return singleDay.name === day
    })

  if (filteredDays.length === 0) {
    return [];
  }

  const interviewers = filteredDays[0].interviewers.map((app) => {
    return state.interviewers[app]
  })

  return interviewers;
}