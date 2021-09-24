import React, { useContext, useEffect } from "react";
import Spinner from "../layout/Spinner";
import ContactContext from "../../context/contact/contactContext";
import classes from "./Upcoming.module.css";

const Upcoming = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, getContacts, loading } = contactContext;

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, []);

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please add a contact</h4>;
  }

  const formatDate = (dateToFormat) =>
    new Date(dateToFormat).toLocaleDateString("sq-AL", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

  const upcomingEvent = (event) => {
    const eventMonth = new Date(event).getMonth();
    let eventDay;
    if (new Date(event).getDate() < 10) {
      eventDay = new Date(event).getDate() / 10;
    } else {
      eventDay = new Date(event).getDate() / 100;
    }

    const currMonth = new Date().getMonth();
    let currDay;
    if (new Date().getDate() < 10) {
      currDay = new Date().getDate() / 10;
    } else {
      currDay = new Date().getDate() / 100;
    }

    const eventFormat = eventMonth + eventDay;
    const currFormat = currMonth + currDay;
    console.log(eventFormat);
    console.log(currFormat);

    const daysLeftDecimals = eventFormat - currFormat;
    return Math.round(daysLeftDecimals * 100) / 1;
  };

  return (
    <div className={classes["upcoming-container"]}>
      <h2>Notifications</h2>
      <ul>
        {contacts !== null && !loading ? (
          contacts.map((contact) => {
            if (upcomingEvent(contact.birthday) < 14) {
              return (
                <li key={Math.random() * 10000}>
                  {"> "}
                  {contact.name}'s birthday is in{" "}
                  {upcomingEvent(contact.birthday)} days
                </li>
              );
            }
          })
        ) : (
          <Spinner />
        )}
        {contacts !== null && !loading ? (
          contacts.map((contact) => {
            if (upcomingEvent(contact.weddingAnniversary) < 14) {
              return (
                <li key={Math.random() * 10000}>
                  {"> "}
                  {contact.name}'s wedding anniversary is in{" "}
                  {upcomingEvent(contact.weddingAnniversary)} days
                </li>
              );
            }
          })
        ) : (
          <Spinner />
        )}
        {contacts !== null && !loading ? (
          contacts.map((contact) => {
            if (upcomingEvent(contact.workAnniversary) < 14) {
              return (
                <li key={Math.random() * 10000}>
                  {"> "}
                  {contact.name}'s work anniversary is in{" "}
                  {upcomingEvent(contact.workAnniversary)} days
                </li>
              );
            }
          })
        ) : (
          <Spinner />
        )}
      </ul>
    </div>
  );
};

export default Upcoming;
