import { View } from "react-native";

const MaxWidthWrapper = ({ className, children }) => {
  return (
    <View
      className={`mx-auto w-full max-w-screen-xl px-4 ${className}`}
    >
      {children}
    </View>
  );
};

export default MaxWidthWrapper;
