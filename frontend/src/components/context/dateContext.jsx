import { createContext, useState } from "react";

export const DateContext = createContext();

export const DateContextProvider = ({ children }) => {
  const [date, setCurrentDate] = useState(new Date());

  const goOneDayBack = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const goOneDayForward = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  return (
    <DateContext.Provider value={{ date, setCurrentDate, goOneDayBack, goOneDayForward }}>
      {children}
    </DateContext.Provider>
  );
};
