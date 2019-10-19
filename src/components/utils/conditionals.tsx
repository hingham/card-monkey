import React from 'react';

const render = (condition = false, children = null) => {
  return !!condition ? children : null;
};

export const If = (props: any) =>
  React.Children.map(props.children, child =>
    React.cloneElement(child, { condition: props.condition }),
  );

export const Then = (props: any) => render(props.condition, props.children);
export const Else = (props: any) => render(!props.condition, props.children);
export const When = (props: any) => render(props.condition, props.children);
export const Unless = (props: any) => render(!props.condition, props.children);