import { IUser } from "@/logic/services/user/ServiceUsers"

import { IRaffledCode } from "@/logic/services/raffledcodes/ServiceRaffledCodes"

export const constUser: IUser = {
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
  birthDate: "",
  phone: "",
  role: "USER",
  raffledCodes: [{
    ownerId: "",
    raffleCode: "",
    createdBy: ""
  }]
}

export const constRegisterValidationMsgs = {
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    birthDate: "",
    phone: "",
}


