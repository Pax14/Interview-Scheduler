import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {

  let interviewerSelected = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  })

  let imageSelected = classNames("interviewers__item-image", {
    "interviewers__item--selected-image": props.selected,
  })
  
  return (
    <li className={interviewerSelected} onClick={props.setInterviewer}>
      <img className={imageSelected} src={props.avatar} alt={props.name}/>
      {props.selected && props.name}
    </li>
  );
}