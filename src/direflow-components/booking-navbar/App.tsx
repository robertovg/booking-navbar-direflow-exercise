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
  font-size: 16px;
  &,
  & * {
    font-family: "Lato", sans-serif;
  }
  & > button {
    transition: background-color 0.3s ease;

    & {
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
  @media (max-width: 500px) {
    font-size: 10px;
    column-gap: 0.5rem;
    & > button {
      max-width: 200px;
      display: inline-block;
      white-space: nowrap;
      overflow: hidden !important;
      text-overflow: ellipsis;
      padding-left: 15px;
      padding-right: 15px;
    }
  }
  @media (max-width: 350px) {
    & > button {
      max-width: 70px;
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
