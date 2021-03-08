import React, { FC, useContext, useState } from "react";
import { EventContext } from "direflow-component";
import { Styled } from "direflow-component";

import styled from "styled-components";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import dateCss from "react-dates/lib/css/_datepicker.css";

import moment, { Moment } from "moment";

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

  const [startDate, setStartDate] = useState<Moment | null>(moment());
  const [endDate, setEndDate] = useState<Moment | null>(moment());

  const handleClick = () => {
    window.open(bookingURL);
    const event = new Event("my-event");
    dispatch(event);
  };

  return (
    <Styled styles={dateCss}>
      <AppStyled>
        <DateRangePicker
          startDate={startDate} // momentPropTypes.momentObj or null,
          startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
          endDate={endDate} // momentPropTypes.momentObj or null,
          endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
          onDatesChange={({
            startDate: startDateParam,
            endDate: endDateParam,
          }) => {
            setStartDate(startDateParam);
            setEndDate(endDateParam);
          }} // PropTypes.func.isRequired,
          focusedInput={null} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={() => null}
          minimumNights={1}
        />
        <button className="button" onClick={handleClick}>
          Click me!
        </button>
      </AppStyled>
    </Styled>
  );
};

export default App;
