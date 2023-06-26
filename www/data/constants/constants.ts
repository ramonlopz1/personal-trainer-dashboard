import { IUser } from "@/logic/services/user/ServiceUsers";

import { IRaffledCode } from "@/logic/services/raffledcodes/ServiceRaffledCodes";

export const constUser = {
  image: "pattern",
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
  birthDate: "",
  phone: "",
  role: "USER",
};

export const constRegisterValidationMsgs = {
  image: "",
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
  birthDate: "",
  phone: "",
};
