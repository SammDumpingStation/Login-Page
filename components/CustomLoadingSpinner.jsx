import React from "react";
import Spinner from "react-native-loading-spinner-overlay";

const CustomLoadingSpinner = ({ isLoading, textLabel = "default" }) => {
  return (
    <Spinner
      visible={isLoading}
      textContent={
        textLabel === "register" ? "Creating you account..." : "Loading..."
      }
      textStyle={{ color: "white" }}
      animation="fade"
    />
  );
};

export default CustomLoadingSpinner;
