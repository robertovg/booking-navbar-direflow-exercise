import moment, { Moment } from "moment";
import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "./DatePicker";

interface AppProps {
  bookingURL?: string;
  lightAccent?: string;
  strongAccent?: string;
  disabledAccent?: string;
  currency?: string;
  bookingActionLabel?: string;
}

const orangeLight = "#f2937c";
const orangeStrong = "#f87459";
const brownLight = "#bcafa2";

const AppStyled = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  grid-auto-flow: column;
  column-gap: 1rem;
  &,
  & * {
    font-family: "Lato", sans-serif;
  }
  & > button {
    transition: background-color 0.3s ease;

    & {
      font-size: 16px;
      text-transform: uppercase;
      padding: 15px 30px;
      border: none;
      cursor: pointer;
      justify-content: space-around;
      background: ${orangeStrong};
      color: white;
    }
    &:hover {
      background: ${orangeLight};
      color: white;
    }
  }
`;

const App = ({
  bookingURL = "https://bookingURL",
  lightAccent = orangeLight,
  strongAccent = orangeStrong,
  disabledAccent = brownLight,
  currency = "EUR",
  bookingActionLabel = "book",
}: AppProps): JSX.Element => {
  const [startDate, setStartDate] = useState<Moment | null>(moment());
  const [endDate, setEndDate] = useState<Moment | null>(moment());

  const handleDatesChange = ({
    startDate,
    endDate,
  }: {
    startDate: Moment | null;
    endDate: Moment | null;
  }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const openBookingPage = () => {
    const params = [
      ...(startDate ? [`checkInDate=${startDate?.format("YYYY-MM-DD")}`] : []),
      ...(endDate ? [`checkOutDate=${endDate?.format("YYYY-MM-DD")}`] : []),
      `locale=${(window?.navigator?.language ?? "en").substr(0, 2)}`,
      `currency=${currency}`,
    ];

    const urlToOpen = `${bookingURL}${params
      .map((e, i) => `${i ? "&" : "?"}${e}`)
      .join("")}`;
    window.open(urlToOpen);
  };

  return (
    <AppStyled>
      <DatePicker
        lightAccent={lightAccent}
        strongAccent={strongAccent}
        disabledAccent={disabledAccent}
        onDateChange={handleDatesChange}
      />
      <button className="button" onClick={openBookingPage}>
        {bookingActionLabel}
      </button>
    </AppStyled>
  );
};

export default App;
