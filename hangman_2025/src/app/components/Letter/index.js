import React from 'react'
import "./Letter.css"

const Letter = (props) => <div className={props.wrong ? "ltr clr--rd" : "ltr"}>{props.letter}</div>

export default Letter