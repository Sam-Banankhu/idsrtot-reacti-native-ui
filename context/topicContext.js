import { createContext, useState, useContext } from "react";

const TopicContext = createContext();

export const useTopicContext = () => {
  return useContext(TopicContext);
};

export default TopicContextProvider = ({ children }) => {
  const [currentTopic, setCurrentTopic, ] = useState({});
  const [sections, setSections] = useState([]);

  return (
    <TopicContext.Provider
      value={{
        currentTopic,
        setCurrentTopic,
        sections,
        setSections
      }}
    >
      {children}
    </TopicContext.Provider>
  );
};
