export function validateSignupForm(data) {
  const validationErrors = {};

  if (!data.firstName) {
    validationErrors.firstName = "First Name is required";
  }

  if (!data.lastName) {
    validationErrors.lastName = "Last Name is required";
  }

  if (!data.email) {
    validationErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    validationErrors.email = "Invalid email format";
  }

  if (!data.location) {
    validationErrors.location = "Location is required";
  }

  if (!data.gender) {
    validationErrors.gender = "Select your gender";
  }

  if (!data.hobbies) {
    validationErrors.hobbies = "Enter your hobbies";
  }

  if (!data.password) {
    validationErrors.password = "Password is required";
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(
      data.password
    )
  ) {
    validationErrors.password =
      "Password must be 8-20 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character";
  }

  if (!data.confirmPassword) {
    validationErrors.confirmPassword = "Confirm Password is required";
  } else if (data.password !== data.confirmPassword) {
    validationErrors.confirmPassword = "Passwords do not match";
  }

  return validationErrors;
}
