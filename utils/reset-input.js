const resetInput = ({ type }) => {
  return type === "login"
    ? { name: "", username: "" }
    : {
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPwd: "",
      };
};

export default resetInput;
