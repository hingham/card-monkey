import React, { Component } from "react";

import CardMonkey from "./components/card-monkey/card-monkey";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

import "./styles/design.scss";

export default function App(props: any) {
  // document.cookie.split(";").forEach((cookie) => {
  //   document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  // });

  return (
    <>
      <CardMonkey />
      <Footer />
    </>
  );
}

