import { Users } from "@prisma/client";
import styles from "./ClientOverview.module.css";
import { Dispatch, useState } from "react";
import { Chart } from "@/components/templates/Chart";

interface ClientOverview {
  user: any;
}

export default function ClientsOverview({ user }: ClientOverview): JSX.Element {
  const [data, setData] = useState({});
  const [readOnly, setReadOnly] = useState(false);
  const [formData, setFormData] = useState({});
  const onClickHandler = async () => {};

  const updateDataBtn = (event: any) => {
    event.preventDefault();
    const form = event.target;
    const formDataObject = {};
    const formDataEntries = new FormData(form).entries();
    for (const [name, value] of formDataEntries) {
      formDataObject[name] = value;
    }

    setFormData(formDataObject);

    console.log(formData);
    setReadOnly(!readOnly);
  };

  const calcIMC = (weight: number, height: number) => {
    if (weight <= 0 || height <= 0) return {};

    const imc = weight / (height * height);
    let classificationEN = "";
    let bgColor = "";
    if (imc < 18.5) {
      bgColor = "yellow";
      classificationEN = "Abaixo do peso";
    } else if (imc >= 18.5 && imc < 24.9) {
      bgColor = "green";
      classificationEN = "Peso normal";
    } else if (imc >= 25 && imc < 29.9) {
      bgColor = "yellow";
      classificationEN = "Sobrepeso";
    } else if (imc >= 30 && imc < 34.9) {
      bgColor = "red";
      classificationEN = "Obesidade leve";
    } else if (imc >= 35 && imc < 39.9) {
      bgColor = "red";
      classificationEN = "Obesidade moderada";
    } else {
      bgColor = "red";
      classificationEN = "Obesidade grave";
    }

    return {
      imc: imc.toFixed(2),
      classificationEN,
      bgColor,
    };
  };

  return (
    <div className={styles.clientsOverview}>
      <h3 className={styles.title}>{user?.name}</h3>
      <form className={styles.form} onSubmit={updateDataBtn}>
        <div className={styles.personalInfo}>
          <div className={styles.titleAndBtnUpdate}>
            <h5>Informações pessoais</h5>
            <input type="submit" value="Atualizar"></input>
          </div>
          <div className={styles.personalInfoInputs}>
            <div className={styles.divInput}>
              <label htmlFor="name">Name</label>
              <input
                readOnly={readOnly}
                name="name"
                type="text"
                value={user?.name || ""}
              />
            </div>
            <div className={styles.divInput}>
              <label htmlFor="gender">Gênero</label>
              <input
                readOnly={readOnly}
                name="gender"
                type="text"
                value={user?.gender || ""}
              />
            </div>
            <div className={styles.divInput}>
              <label htmlFor="birthDate">Data nasc.</label>
              <input
                readOnly={readOnly}
                name="birthDate"
                type="text"
                value={user?.birthDate || ""}
              />
            </div>

            <div className={styles.divInput}>
              <label htmlFor="email">E-mail</label>
              <input
                readOnly={readOnly}
                name="email"
                type="text"
                value={user?.email || ""}
              />
            </div>

            <div className={styles.divInput}>
              <label htmlFor="phone">Telefone</label>
              <input
                readOnly={readOnly}
                name="phone"
                type="text"
                value={user?.phone || ""}
              />
            </div>

            <div className={styles.divInput}>
              <label htmlFor="createdAt">Data criação</label>
              <input
                readOnly={readOnly}
                name="createdAt"
                type="date"
                value={user?.createdAt}
              />
            </div>
            <div className={styles.divInput}>
              <label htmlFor="objective">Objetivo</label>
              <input
                readOnly={readOnly}
                name="objective"
                type="text"
                value={user?.healthInformation?.objective}
              />
            </div>
            <div className={styles.divInput}>
              <label htmlFor="weight">Peso (kg)</label>
              <input
                readOnly={readOnly}
                name="weight"
                type="text"
                value={`${user?.healthInformation?.weight}`}
              />
            </div>
            <div className={styles.divInput}>
              <label htmlFor="height">Altura (m)</label>
              <input
                readOnly={readOnly}
                name="height"
                type="text"
                value={`${user?.healthInformation?.height}`}
              />
            </div>
          </div>
        </div>
        <div className={styles.healthInfo}>
          <div className={styles.titleAndBtnUpdate}>
            <h5>Funções</h5>
            <input type="submit" value="Atualizar"></input>
          </div>
          <div className={styles.healthInfoBox}>
            <div className={styles.healthInfoInputs}>
              <div className={styles.divInput}>
                <label htmlFor="classificationEN">Classificação do EN</label>
                <input
                  readOnly={readOnly}
                  name="classificationEN"
                  type="text"
                  style={{
                    fontWeight: "bold",
                    backgroundColor: calcIMC(
                      user?.healthInformation?.weight,
                      user?.healthInformation?.height
                    ).bgColor,
                  }}
                  value={
                    calcIMC(
                      user?.healthInformation?.weight,
                      user?.healthInformation?.height
                    ).classificationEN
                  }
                />
              </div>
              <div className={styles.divInput}>
                <label htmlFor="imc">IMC</label>
                <input
                  readOnly={readOnly}
                  name="imc"
                  type="text"
                  value={
                    calcIMC(
                      user?.healthInformation?.weight,
                      user?.healthInformation?.height
                    ).imc
                  }
                />
              </div>
              <div className={styles.divInput}>
                <label htmlFor="fc">FC</label>
                <input
                  readOnly={readOnly}
                  name="fc"
                  type="text"
                  value={user?.healthInformation?.fc}
                />
              </div>
              <div className={styles.divInput}>
                <label htmlFor="vo2max">Vo2Max</label>
                <input
                  readOnly={readOnly}
                  name="vo2max"
                  type="text"
                  value={user?.healthInformation?.vo2max}
                />
              </div>
              <div className={styles.divInput}>
                <label htmlFor="pa">PA</label>
                <input
                  readOnly={readOnly}
                  name="pa"
                  type="text"
                  value={`${user?.healthInformation?.pa}`}
                />
              </div>
            </div>
            <div className={styles.healthDescription}>
              <div className={styles.healthDescriptionTextarea}>
                <label htmlFor="description">Informações</label>
                <textarea
                  name="description"
                  placeholder="Digite aqui informações sobre o aluno."
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.generalInfo}>
          <div className={styles.generalInfoInputs}>
            <div className={styles.titleAndBtnUpdate}>
              <h5>Frequência</h5>
              <input type="submit" value="Atualizar"></input>
            </div>
            <div className={styles.frequency}>
              <table>
                <tr>
                  {Array.from({ length: 32 }, (_, index) => index + 1).map(
                    (element, i) => (i > 0 ? <td>{i}</td> : false)
                  )}
                </tr>
                <tr>
                  {Array.from({ length: 32 }, (_, index) => index + 1).map(
                    (element, i) => (i > 0 ? <td>{i}</td> : false)
                  )}
                </tr>
                <tr>
                  {Array.from({ length: 32 }, (_, index) => index + 1).map(
                    (element, i) => (i > 0 ? <td>{i}</td> : false)
                  )}
                </tr>
              </table>
            </div>
            <div className={styles.tables}>
              <table>
                <thead>
                  <tr style={{ height: "50px" }}>
                    <th colSpan={2} rowSpan={2} className={styles.colPeriods}>
                      Periodização
                    </th>
                    <th
                      colSpan={13}
                      style={{ height: "25px" }}
                      className={styles.macrociclo}
                    >
                      Macrociclo
                    </th>
                  </tr>
                  <tr style={{ height: "35px" }} className={styles.mesociclo}>
                    <th colSpan={4}>Mesociclo</th>
                    <th colSpan={4}>Mesociclo</th>
                    <th colSpan={5}>Mesociclo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2 a 5</td>
                    <td>3</td>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                    <td>7</td>
                    <td>8</td>
                    <td>9</td>
                    <td>10</td>
                    <td>11</td>
                    <td>12</td>
                  </tr>
                  <tr>
                    {user?.healthInformation?.macrociclo?.mesociclo.map(
                      (elem: any, i: any) => {
                        return (
                          <td key={i}>
                            <input
                              readOnly={readOnly}
                              name={`periodizacaoTable${i}`}
                              className={styles.tableInput}
                              type="text"
                              value={elem}
                            />
                          </td>
                        );
                      }
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={styles.tables}>
              <table>
                <thead>
                  <tr>
                    <th className={styles.colInclinacao}>Inclinação</th>
                    <th colSpan={5} className={styles.colFCVo2Max}>
                      FC
                    </th>
                    <th colSpan={2} className={styles.colFCVo2Max}>
                      Vo2Max - Cardio
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={styles.subTr}>
                    <td rowSpan={15}></td>
                    <td colSpan={2}>% Entrenamiento</td>
                    <td>FCT</td>
                    <td colSpan={2}>% Entranamiento</td>
                    <td colSpan={2}>Velocidade</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
                <input type="text" name="abc" />
              </table>
            </div>
          </div>
        </div>
      </form>
      <div className={styles.charts}>
        <Chart chartData={user?.healthInformation?.fcev02max?.velocidade} />
      </div>
      <div className={styles.charts}>
        <Chart chartData={user?.healthInformation?.fcev02max?.velocidade} />
      </div>
    </div>
  );
}
