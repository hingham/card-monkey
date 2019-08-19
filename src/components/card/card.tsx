import React from "react"

type CardProps = {
  concept: string;
  definition: string;
}


const Card = (props: CardProps) => {
  return (
    <li className="deck-card">
      <div>
        <h4> {props.concept} </h4>
        <p> {props.definition} </p>
        <div onClick={() => console.log('user wants to edit card')}>
          <img
            src="https://image.flaticon.com/icons/svg/61/61456.svg"
            style={{ width: "60%" }}
          />
        </div>
      </div>
    </li>
  )
}

export default Card;