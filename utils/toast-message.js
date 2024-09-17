import Toast from "react-native-toast-message";
import CustomToast from "@/components/CustomToast";

const toastConfig = {
  customToast: ({ text1, text2 }) => (
    <CustomToast text1={text1} text2={text2} />
  ),
};

const showToast = ({ type, success = true, customMessage = "" } = {}) => {
  Toast.show({
    type: "customToast",
    text1: success ? "Success" : "Error",
    text2:
      customMessage.length != 0
        ? customMessage
        : success
        ? type === "login"
          ? "Successfully Logged-in"
          : "Successfully Registered!"
        : "Make sure to input correctly",
  });
};


export default { showToast, toastConfig };
