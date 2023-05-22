export default class ValidatorFormLogin {
  name(name: string): string {
    if (name.length <= 0) {
      return "Informe o nome.";
    } else if (name.length > 200) {
      return "Nome deve ter no máximo 200 caracteres.";
    } else if (name.split(" ").length === 1) {
      return "Mínimo nome e sobrenome";
    }

    return "";
  }

  email(email: string): string {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!regex.test(email)) {
      return "E-mail inválido.";
    }

    return "";
  }

  password(password: string): string {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!regex.test(password)) return "Senha inválida";

    return "";
  }

  passwordConfirmation(password: string, passwordConfirmation: string): string {
    if (password !== passwordConfirmation) return "Senhas divergentes.";
    return "";
  }

  phone(phone: string): string {
    const formatted = phone
      .replace(" ", "")
      .replace("(", "")
      .replace(")", "")
      .replace("_", "")
      .replace("-", "");

    console.log(formatted);
    const regexPhone = /^\d{10,11}$/;

    if (!regexPhone.test(formatted)) return "Telefone inválido.";
    return "";
  }

  birthDate(date: string): string {
    const d = new Date();
    const currDate = Date.parse(d);
    const minimumDate = Date.parse("1990-01-01T00:00:00.142Z");
    const btDate = Date.parse(date);

    if (btDate < minimumDate || btDate > currDate) {
      return "Insira uma data entre 1900 e a data atual.";
    }

    return "";
  }
}
