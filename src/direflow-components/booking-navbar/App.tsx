import React, { FC, useContext } from "react";
import { EventContext } from "direflow-component";
import styled from "styled-components";

interface IProps {
  bookingURL?: string;
}

const AppStyled = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  grid-auto-flow: column;
  &,
  & * {
    font-family: "Lato", sans-serif;
  }
`;

const App: FC<IProps> = ({ bookingURL = "https://bookingURL" }) => {
  const dispatch = useContext(EventContext);

  const handleClick = () => {
    window.open(bookingURL);
    const event = new Event("my-event");
    dispatch(event);
  };

  return (
    <AppStyled>
      <div>Works</div>
      <button className="button" onClick={handleClick}>
        Click me!
      </button>
    </AppStyled>
  );
};

export default App;
