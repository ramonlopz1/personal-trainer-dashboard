import { Users } from "@prisma/client";
import styles from "./ClientOverview.module.css";
import { Dispatch, useState } from "react";
import { Chart } from "@/components/templates/Chart";
import { AiOutlineConsoleSql } from "react-icons/ai";
import { FaEdit, FaSave } from "react-icons/fa";

interface ClientOverview {
  user: any;
  setUser: any;
}

export default function ClientsOverview({
  user,
  setUser,
}: ClientOverview): JSX.Element {
  const [data, setData] = useState({});
  const [readOnly, setReadOnly] = useState(false);
  const [view, setView] = useState<string>("workouts");

  const updateDataBtn = (event: any) => {
    event.preventDefault();
    console.log(event.target)
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

  const renderDescriptions = (arr: any[]) => {
    if (!arr) return false;

    return arr.reverse()?.map((v: any, i: any) => {
      const localeDate = new Date(v.createdAt).toLocaleDateString();
      const alternateDate = new Date(new Date().getTime()).toLocaleDateString();

      return (
        <div key={i} className={styles.description}>
          <span>
            {localeDate === "Invalid Date" ? alternateDate : localeDate}
          </span>
          <span>-</span>
          <span>{v?.description}</span>
        </div>
      );
    });
  };

  const renderMesocicloTable = (arr: any[]) => {
    if (!arr || !user) return false;
    const rows = [];

    for (let i = 0; i < arr.length; i += 12) {
      const chunk = arr.slice(i, i + 12);
      rows.push(chunk);
    }

    const updateCell = (event: any) => {
      const value = event.target.value;
      const index = event.target.name;

      if (!user) return false;
      const userAux = user;
      userAux.healthInformation.macrociclo.mesociclo[index - 1] =
        parseInt(value);
      setUser(userAux);
    };

    let totalData = 0;
    return rows.map((row, i) => {
      return (
        <tr key={i} aria-rowindex={i}>
          <td></td>
          <td></td>
          {row.map((data, j) => {
            {
              totalData += 1;
            }
            return (
              <td key={j} aria-colindex={j}>
                <input
                  readOnly={readOnly}
                  name={totalData.toString()}
                  type="text"
                  className={styles.tableInput}
                  value={data}
                  onChange={(event) => updateCell(event)}
                />
              </td>
            );
          })}
        </tr>
      );
    });
  };

  return (
    <div className={styles.clientsOverview}>
      <form className={styles.form} onSubmit={updateDataBtn}>
        <div className={styles.topTitle}>
          <h3 className={styles.title}>{user?.name}</h3>
          <button type="submit">{!readOnly ? <FaSave /> : <FaEdit />}</button>
        </div>
        <div className={styles.personalInfo}>
          <div className={styles.titleAndBtnUpdate}>
            <h5>Informações pessoais</h5>
          </div>
          <div className={styles.personalInfoInputs}>
            <div className={styles.divInput}>
              <label htmlFor="name">Name</label>
              <input
                readOnly={readOnly}
                name="name"
                type="text"
                value={user?.name || ""}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </div>
            <div className={styles.divInput}>
              <label htmlFor="gender">Gênero</label>
              <input
                readOnly={readOnly}
                name="gender"
                type="text"
                value={user?.gender || ""}
                onChange={(e) => setUser({ ...user, gender: e.target.value })}
              />
            </div>
            <div className={styles.divInput}>
              <label htmlFor="birthDate">Data nasc.</label>
              <input
                readOnly={readOnly}
                name="birthDate"
                type="text"
                value={user?.birthDate || ""}
                onChange={(e) =>
                  setUser({ ...user, birthDate: e.target.value })
                }
              />
            </div>

            <div className={styles.divInput}>
              <label htmlFor="profission">Profissão</label>
              <input
                readOnly={readOnly}
                name="profission"
                type="text"
                value={user?.profission || ""}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>

            <div className={styles.divInput}>
              <label htmlFor="email">E-mail</label>
              <input
                readOnly={readOnly}
                name="email"
                type="text"
                value={user?.email || ""}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>

            <div className={styles.divInput}>
              <label htmlFor="phone">Telefone</label>
              <input
                readOnly={readOnly}
                name="phone"
                type="text"
                value={user?.phone || ""}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
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
                onChange={(e) =>
                  setUser({ ...user, healthInformation: {
                    ...user?.healthInformation,
                    objective: e.target.value
                  } })
                }
              />
            </div>
            <div className={styles.divInput}>
              <label htmlFor="weightAtMorning">Peso em jejum(kg)</label>
              <input
                readOnly={readOnly}
                name="weightAtMorning"
                type="text"
                value={`${user?.healthInformation?.weightfastin}`}
                onChange={(e) =>
                  setUser({ ...user, weightAtMorning: e.target.value })
                }
              />
            </div>
            <div className={styles.divInput}>
              <label htmlFor="weightAtNight">Peso à noite (kg)</label>
              <input
                readOnly={readOnly}
                name="weightAtNight"
                type="text"
                value={`${user?.healthInformation?.weightAtNight}`}
                onChange={(e) =>
                  setUser({ ...user, weightAtNight: e.target.value })
                }
              />
            </div>
            <div className={styles.divInput}>
              <label htmlFor="height">Altura (m)</label>
              <input
                readOnly={readOnly}
                name="height"
                type="text"
                value={`${user?.healthInformation?.height}`}
                onChange={(e) => setUser({ ...user, height: e.target.value })}
              />
            </div>
            <div className={styles.divInput}>
              <label htmlFor="sleepHour">Hora que dorme</label>
              <input
                readOnly={readOnly}
                name="sleepHour"
                type="text"
                value={`${user?.healthInformation?.sleepHour}`}
                onChange={(e) =>
                  setUser({ ...user, sleepHour: e.target.value })
                }
              />
            </div>
            <div className={styles.divInput}>
              <label htmlFor="awakeHour">Hora que acorda</label>
              <input
                readOnly={readOnly}
                name="awakeHour"
                type="text"
                value={`${user?.healthInformation?.wakedHour}`}
                onChange={(e) =>
                  setUser({ ...user, wakedHour: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <nav className={styles.nav}>
          <button onClick={() => setView("anamnese")}>Anamnese</button>
          <button onClick={() => setView("workouts")}>Treinos</button>
        </nav>
        {view === "workouts" ? (
          <div className={styles.workouts}>
            <h3 className={styles.topTitle}>Treinos</h3>
            <div className={styles.healthInfo}>
              <div className={styles.titleAndBtnUpdate}>
                <h5>Funções</h5>
              </div>
              <div className={styles.healthInfoBox}>
                <div className={styles.healthInfoInputs}>
                  <div className={styles.divInput}>
                    <label htmlFor="classificationEN">
                      Classificação do EN
                    </label>
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
                      onChange={(e) => setUser({ ...user, fc: e.target.value })}
                    />
                  </div>
                  <div className={styles.divInput}>
                    <label htmlFor="vo2max">Vo2Max</label>
                    <input
                      readOnly={readOnly}
                      name="vo2max"
                      type="text"
                      value={user?.healthInformation?.vo2max}
                      onChange={(e) =>
                        setUser({ ...user, vo2max: e.target.value })
                      }
                    />
                  </div>
                  <div className={styles.divInput}>
                    <label htmlFor="pa">PA</label>
                    <input
                      readOnly={readOnly}
                      name="pa"
                      type="text"
                      value={`${user?.healthInformation?.pa}`}
                      onChange={(e) => setUser({ ...user, pa: e.target.value })}
                    />
                  </div>
                </div>
                <div className={styles.healthDescription}>
                  <div className={styles.healthDescriptionTextarea}>
                    <label htmlFor="description">Informações</label>
                    <input
                      type="text"
                      maxLength={108}
                      name="description"
                      placeholder="Digite aqui informações sobre o aluno."
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          setUser({
                            ...user,
                            healthInformation: {
                              ...user?.healthInformation,
                              descriptions: [
                                {
                                  description: e.target.value,
                                },
                                ...user?.healthInformation?.descriptions,
                              ],
                            },
                          });
                        }
                      }}
                    ></input>
                    <div className={styles.descriptions}>
                      {renderDescriptions(
                        user?.healthInformation?.descriptions
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.generalInfo}>
              <div className={styles.generalInfoInputs}>
                <div className={styles.titleAndBtnUpdate}>
                  <h5>Frequência</h5>
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
                        <th
                          colSpan={2}
                          rowSpan={2}
                          className={styles.colPeriods}
                        >
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
                      <tr
                        style={{ height: "35px" }}
                        className={styles.mesociclo}
                      >
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

                      {renderMesocicloTable(
                        user?.healthInformation?.macrociclo?.mesociclo
                      )}
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
            <div className={styles.charts}>
              <Chart
                type="line"
                chartData={user?.healthInformation?.fcev02max?.velocidade}
              />
            </div>
            <div className={styles.charts}>
              <Chart
                type="bar"
                chartData={user?.healthInformation?.fcev02max?.velocidade}
              />
            </div>
          </div>
        ) : (
          false
        )}
        {view === "anamnese" ? (
          <div className={styles.anamnese}>
            <h3 className={styles.topTitle}>Anamnese</h3>
            <div className={styles.anamneseInfo}>
              <div className={styles.workoutActivity}>
                <h5>Pratica atividade física?</h5>
                <div className={styles.infos}>
                  <div className={styles.divInput}>
                    <label htmlFor="type">Tipo</label>
                    <input
                      readOnly={readOnly}
                      name="type"
                      type="text"
                      value={user?.healthInformation?.workoutActivity?.type || ""}
                      onChange={(e) =>
                        setUser({ ...user, healthInformation: {
                          ...user?.healthInformation,
                          workoutActivity: {
                            ...user?.healthInformation?.workoutActivity,
                            type: e.target.value
                          }
                        } })
                      }
                    />
                  </div>
                  <div className={styles.divInput}>
                    <label htmlFor="practiceTime">Horário</label>
                    <input
                      readOnly={readOnly}
                      name="practiceTime"
                      type="time"
                      value={user?.healthInformation?.workoutActivity?.practiceTime || ""}
                      onChange={(e) =>
                        setUser({ ...user, healthInformation: {
                          ...user?.healthInformation,
                          workoutActivity: {
                            ...user?.healthInformation?.workoutActivity,
                            practiceTime: e.target.value
                          }
                        } })
                      }
                    />
                  </div>
                  <div className={styles.divInput}>
                    <label htmlFor="frequency">Frequência</label>
                    <input
                      readOnly={readOnly}
                      name="frequency"
                      type="text"
                      value={user?.healthInformation?.workoutActivity?.frequency || ""}
                      onChange={(e) =>
                        setUser({ ...user, healthInformation: {
                          ...user?.healthInformation,
                          workoutActivity: {
                            ...user?.healthInformation?.workoutActivity,
                            frequency: e.target.value
                          }
                        } })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          false
        )}
      </form>
    </div>
  );
}
