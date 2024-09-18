import { createContext, useState, useContext } from "react";

const TopicContext = createContext();

export const useTopicContext = () => {
  return useContext(TopicContext);
};

export default TopicContextProvider = ({ children }) => {
  const [currentTopic, setCurrentTopic] = useState({});

  return (
    <TopicContext.Provider
      value={{
        currentTopic,
        setCurrentTopic,
      }}
    >
      {children}
    </TopicContext.Provider>
  );
};
