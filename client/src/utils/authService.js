const isLoggedIn = () => {
  let token =
    localStorage.getItem("EmployeeToken") ||
    localStorage.getItem("ManagerToken");
  if (token) return true;
  else return false;
};
export { isLoggedIn };
