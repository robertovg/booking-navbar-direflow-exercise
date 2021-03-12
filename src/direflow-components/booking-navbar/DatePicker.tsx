import { Moment } from "moment";
import React, { useState } from "react";
import { DateRangePicker, FocusedInputShape } from "react-dates";
import "react-dates/initialize";
import dateCss from "react-dates/lib/css/_datepicker.css";
import styled, { css } from "styled-components";

interface DatePickerStyledProps {
  lightAccent: string;
  strongAccent: string;
  disabledAccent: string;
}
interface DatePickerProps extends DatePickerStyledProps {
  onDateChange?: (dateChange: {
    startDate: Moment | null;
    endDate: Moment | null;
  }) => void;
}

const DatePickerStyled = styled.div<DatePickerProps>`
  ${dateCss}
  padding-right: 22px;
  border: 1px solid #dbdbdb;
  .DateRangePickerInput_calendarIcon {
    margin: 0 5px 4px 5px;
  }

  ${(props) => {
    const { lightAccent, strongAccent, disabledAccent } = props;
    return css`
      .DateRangePickerInput__withBorder {
        border: none;
      }
      .CalendarDay__selected_span {
        background: ${lightAccent};
        border-color: ${lightAccent};
        color: white;
      }
      .CalendarDay__selected {
        background: ${strongAccent};
        border-color: ${strongAccent};
        color: white;
      }
      .CalendarDay__selected_span:hover,
      .CalendarDay__selected:hover {
        background: ${strongAccent};
        border-color: ${strongAccent};
        color: white;
      }
      .CalendarDay__hovered_span:hover,
      .CalendarDay__hovered_span {
        background: ${lightAccent};
        border-color: ${lightAccent};
        color: white;
      }

      .CalendarDay__default:hover {
        background: ${strongAccent};
        border-color: ${strongAccent};
        color: white;
      }

      .CalendarDay__default.CalendarDay__blocked_out_of_range:hover {
        background: ${disabledAccent};
        border-color: ${disabledAccent};
        color: white;
      }

      .DateInput_input__focused {
        border-color: ${strongAccent};
      }
      .DayPickerKeyboardShortcuts_show__bottomRight::before {
        border-right-color: ${lightAccent};
        color: white;
      }
      .DayPickerKeyboardShortcuts_show__bottomRight:hover::before {
        border-right-color: ${strongAccent};
        color: white;
      }
    `;
  }};
  @media (max-width: 500px) {
    .DateRangePickerInput_calendarIcon {
      display: none;
    }
    .DateInput {
      width: 90px;
    }
    .DateInput_input {
      font-size: 14px;
    }
  }
`;
const DatePicker = ({
  lightAccent,
  strongAccent,
  disabledAccent,
  onDateChange,
}: DatePickerProps): JSX.Element => {
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(
    null,
  );
  const handleDatesChange = ({
    startDate,
    endDate,
  }: {
    startDate: Moment | null;
    endDate: Moment | null;
  }) => {
    setStartDate(startDate);
    setEndDate(endDate);
    if (startDate && endDate) {
      setFocusedInput(null);
    }
    if (onDateChange) {
      onDateChange({ startDate, endDate });
    }
  };
  return (
    <DatePickerStyled
      className="App"
      lightAccent={lightAccent}
      strongAccent={strongAccent}
      disabledAccent={disabledAccent}
    >
      <DateRangePicker
        showClearDates={false}
        showDefaultInputIcon={true}
        startDate={startDate}
        startDateId="selector-start-date"
        endDate={endDate}
        endDateId="selector-end-date"
        onDatesChange={handleDatesChange}
        focusedInput={focusedInput}
        onFocusChange={(focusedInputParam: FocusedInputShape | null) => {
          if (focusedInputParam) {
            setFocusedInput(focusedInputParam);
          }
        }}
      />
    </DatePickerStyled>
  );
};

export default DatePicker;
