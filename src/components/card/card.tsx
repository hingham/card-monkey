import React from "react"

type CardProps = {
  concept: string;
  definition: string;
}


const Card = (props: CardProps) => {
  return (
    <li className="deck-card">
      <div >
        <h4> {props.concept} </h4>
        <p> {props.definition} </p>
      </div>
    </li>
  )
}

export default Card;