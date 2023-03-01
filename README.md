This component was bootstrapped with [Direflow](https://direflow.io).

# Booking Navbar

> easy booking navbar passing dates to booking_url

```html
<booking-navbar></booking-navbar>
```

Use this README to describe your Direflow Component

## Examples

I used this component in for two different providers, to get a url looking like:

```js
<script src="/apps/booking-navbar/direflowBundle.js"></script>


    <booking-navbar
      bookingURL="https://yourbookingURL.com"
      bookingActionLabel="Reservar"
      startDatePlaceholderText="Entrada"
      endDatePlaceholderText="Salida"
      locale="es"
      currency="EUR"
      dateFormat="YYYY-MM-DD"
      keyCheckInDate="checkInDate"
      keyCheckOutDate="checkOutDate"
      keyLocale="locale"
      keyCurrency="currency"
    ></booking-navbar>
```

Will generate a link like

```text
https://yourbookingURL.com?checkInDate=2023-03-08&checkOutDate=2023-03-18&locale=es&currency=EUR
```

And using it like this.

```js
<script src="/apps/booking-navbar/direflowBundle.js"></script>


    <booking-navbar
      bookingURL="https://yourbookingURL.com"
      bookingActionLabel="Reservar"
      startDatePlaceholderText="Entrada"
      endDatePlaceholderText="Salida"
      locale="es"
      keyCheckInDate="info[arrival_date]"
      keyCheckOutDate="info[departure_date]"
    ></booking-navbar>
```

We get a link like:

```text
https://yourbookingURL.com?info[arrival_date]=15/03/2023&info[departure_date]=24/03/2023&info[total_adult]
```
