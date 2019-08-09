import React from "react"

type CardProps = {
  title: string;
  text: string;
}


const Card = (props: CardProps) => {
  return (
    <div className="card">
      <div>
        <h4> {props.title} </h4>
        <p> {props.text} </p>
      </div>
    </div>
  )
}
export default Card;