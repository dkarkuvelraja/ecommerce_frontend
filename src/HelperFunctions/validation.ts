export const emailRegx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
export const passwordRegx =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const validation = (page: string, data: any) => {
    let errors: any = {};
  
    switch (page) {
      case "signUp":
        errors.email = !data.email
          ? "Email is required"
          : String(data.email)
              .toLowerCase()
              .match(emailRegx)
          ? ""
          : "Invalid email address";
  
        errors.password = !data.password
          ? "Password is required"
          : data.password.length < 8
          ? "Password must be at least 8 characters long"
          :passwordRegx.test(
              data.password
            )
          ? ""
          : "Password must include at least one uppercase, one lowercase, one number, and one special character";

        errors.phone_number = !data.phone_number
          ? "Phone number is required"
          : !/^\d+$/.test(data.phone_number.toString())
          ? "Phone number must contain only digits"
          : "";
  
        break;
  case "login":
    errors.email = !data.email ? "Email is required" : ""
    errors.password = !data.password ? "Password is required" : ""
      default:
        console.warn("Validation not implemented for this page:", page);
        break;
    }
  
    return errors;
  };
  