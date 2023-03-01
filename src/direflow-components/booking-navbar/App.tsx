import moment, { Moment } from "moment";
import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "./DatePicker";

interface AppProps {
  replaceURL?: boolean;
  bookingURL?: string;
  lightAccent?: string;
  strongAccent?: string;
  disabledAccent?: string;
  bookingActionLabel?: string;
  startDatePlaceholderText?: string;
  endDatePlaceholderText?: string;
  locale?: string;
  currency?: string;
  dateFormat?: string;
  keyCheckInDate?: string;
  keyCheckOutDate?: string;
  keyLocale?: string;
  keyCurrency?: string;
}

const orangeLight = "#f2937c";
const orangeStrong = "#f87459";
const brownLight = "#bcafa2";

const AppStyled = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  justify-content: center;
  grid-auto-flow: column;
  column-gap: 1rem;
  font-size: 16px;
  &,
  & * {
    font-family: "Lato", sans-serif;
  }
  *:focus {
    outline: none !important;
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
  @media (max-width: 520px) {
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
  @media (max-width: 355px) {
    display: none;
  }
`;

const App = ({
  replaceURL = false,
  bookingURL = "https://bookingURL",
  lightAccent = orangeLight,
  strongAccent = orangeStrong,
  disabledAccent = brownLight,
  currency = "EUR",
  bookingActionLabel = "book",
  startDatePlaceholderText = "Start Date",
  endDatePlaceholderText = "End Date",
  locale = "en",
  dateFormat = "DD/MM/YYYY",
  keyCheckInDate = "info[arrival_date]",
  keyCheckOutDate = "info[departure_date]",
  keyLocale = undefined,
  keyCurrency = undefined,
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
    const params = new URLSearchParams();
    if (startDate && keyCheckInDate) {
      params.append(keyCheckInDate, startDate.format(dateFormat));
    }
    if (endDate && keyCheckOutDate) {
      params.append(keyCheckOutDate, endDate.format(dateFormat));
    }
    if (locale && keyLocale) {
      params.append(keyLocale, locale);
    }
    if (currency && keyCurrency) {
      params.append(keyCurrency, currency);
    }

    const urlToOpen = `${bookingURL}?${params.toString()}`;
    if (replaceURL) {
      window.location.replace(urlToOpen);
    } else {
      window.open(urlToOpen);
    }
  };

  return (
    <AppStyled>
      <DatePicker
        lightAccent={lightAccent}
        strongAccent={strongAccent}
        disabledAccent={disabledAccent}
        onDateChange={handleDatesChange}
        startDatePlaceholderText={startDatePlaceholderText}
        endDatePlaceholderText={endDatePlaceholderText}
        locale={locale}
      />
      <button className="button" onClick={openBookingPage}>
        {bookingActionLabel}
      </button>
    </AppStyled>
  );
};

App.defaultProps = {
  replaceURL: false,
  bookingURL: "https://bookingURL",
  lightAccent: orangeLight,
  strongAccent: orangeStrong,
  disabledAccent: brownLight,
  currency: "EUR",
  bookingActionLabel: "book",
  startDatePlaceholderText: "Start Date",
  endDatePlaceholderText: "End Date",
  locale: "es",
  dateFormat: "DD/MM/YYYY",
  keyCheckInDate: "info[arrival_date]",
  keyCheckOutDate: "info[departure_date]",
  keyLocale: undefined,
  keyCurrency: undefined,
};

export default App;
