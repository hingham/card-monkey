import React, { Component, MouseEvent } from "react";
import DeckForm from "../form/deck-form";
import DeckQuery from "../query/deck-query";
import UserActions from "../user-actions/user-actions";
import CardQuery from "../query/card-query";
import Welcome from "../welcome/welcome";
import DeckSearch from "../deck-search/deck-search";

import { DeckStore, UserIdInterface } from '../../types/index';
import Header from "../header/header";

import gql from "graphql-tag";
import { client } from "../../apollo-client";

import * as actions from "../../store/actions";
import { connect } from "react-redux";

const USER = gql`
  query($git_id: Int!) {
    user(git_id: $git_id) {
      _id
    }
  }
`;

type PropTypes = {
  data: DeckStore;
  setUser: (id: UserIdInterface) => { type: "USER", payload: any };
  // clearDeck: any;
  clearDeck: (e: MouseEvent) => { type: "CLEAR" };
}

interface CardMonkeyState extends UserIdInterface {
  promise: Promise<number>
}


class CardMonkey extends Component<PropTypes, CardMonkeyState> {
  constructor(props: PropTypes) {
    super(props);
    this.state = {
      promise: this.getUser(),
      git_id: NaN,
      _id: ''
    };
    console.log("state", this.state);
  }

  getUser = async () => {
    const regexp = new RegExp(`.*user=([^;]*)`);
    const result = regexp.exec(document.cookie);
    if (result && result[1]) {
      console.log('the result', result[1]);

      let git_id = parseInt(result[1]);
      let _id = await this.setUserId(git_id);
      this.props.setUser({ git_id, _id });

      console.log(`the values ${git_id}, ${_id}`);

      return parseInt(result[1]);
    } else {
      console.log("not logged in");
      return NaN;
    }
  };

  setUserId = (git_id: number) => {
    return client
      .query({
        query: USER,
        variables: { git_id: git_id }
      })
      .then((results: any) => {
        console.log('results ', results, results.data.user._id);
        return results.data.user._id;
      })
  }


  render() {
    if (this.props.data.user_id) {
      if (this.props.data.deck_id) {
        return (
          <>
            <Header signed_in={true} />
            <section>
              <h2>{this.props.data.deck}: {this.props.data.deck_tags.join(", ")}</h2>
              <CardQuery />
            </section>
          </>
        )
      } else if (this.props.data.deck_creation) {
        return (
          <>
            <Header signed_in={true} />
            <DeckForm />
          </>
        )
      } else if (this.props.data.deck_search) {
        return (
          <>
            <Header signed_in={true} />
            <DeckSearch />
          </>
        )
      }
      else {
        return (
          <>
            <Header signed_in={true} />
            <section className="deck-actions">
              <DeckQuery />
              <UserActions />
            </section>
          </>
        )
      }
    }
    else {
      return (
        <>
          <Header signed_id={false} />
          <Welcome />
        </>
      )
    }
  }
}

const mapStateToProps = (state: PropTypes) => ({
  data: state.data
});

const mapDispatchToProps = (dispatch: any) => ({
  clearDeck: (e: any) => dispatch(actions.clearDeck(e)),
  setUser: (payload: UserIdInterface) => dispatch(actions.setUser(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardMonkey);
