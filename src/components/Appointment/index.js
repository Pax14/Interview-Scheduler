import React from "react";
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRMING = "CONFIRMING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW);
    });
  };

  function cancel() {
    if (mode === CONFIRMING) {
      transition(DELETING);
      props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
    } else {
      transition(CONFIRMING);      
    };
  };
  
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} /> }
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer} 
          onEdit={props.onEdit}
          onDelete={cancel}
        />
      )} 
      {mode === CREATE && (
        <Form 
          name={props.name}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />

      )}
      {mode === SAVING && (
        <Status 
          message="Saving"
        />
      )}
      {mode === CONFIRMING && (
        <Confirm 
          onCancel={back}
          onConfirm={cancel}
          message="Are you sure you want to delete this appointment?"
        />
      )}
    </article>
  )
}  