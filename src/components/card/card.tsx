import React, { Component } from "react"
import "../../meta/images/trash.png";

type CardProps = {
  concept: string;
  definition: string;
  refetchData: Function;
  _id: string;
}

type CardId = {
  _id: string
}



class Card extends Component<CardProps, any> {
  state: any = {};
  deleteCard = (cardId: CardId) => {
    console.log("user wants to delete card", cardId);

    fetch("/.netlify/functions/delete-card", {
      body: JSON.stringify(cardId),
      method: "DELETE"
    })
      .then(() => this.props.refetchData())
      .catch(error => {
        console.log(error);
        return <div> error </div>
      });
  }

  render() {
    return (
      <li className="deck-card">
        <div>
          <h4> {this.props.concept} </h4>
          <p> {this.props.definition} </p>
          <div id="edit" onClick={() => console.log('user wants to edit card')}>
            <img
              src="https://image.flaticon.com/icons/svg/61/61456.svg"
              style={{ width: "60%" }}
            />
          </div>
          <div id="trash" onClick={() => this.deleteCard({ _id: this.props._id })}>
            <img
              src="https://img.icons8.com/windows/32/000000/trash.png"
              style={{ width: "60%" }}
            />
            {/* <a href="https://icons8.com/icon/14237/trash">Trash icon by Icons8</a> */}
          </div>
        </div>
      </li>
    )

  }
}


export default Card;