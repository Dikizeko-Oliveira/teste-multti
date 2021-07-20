import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import {
  FaChevronLeft,
  FaChevronRight,
  FaPaperclip,
  FaPrint,
  FaSearch,
  FaSortAlphaUpAlt,
} from "react-icons/fa";

import { Header } from "./components/Header";

import styles from "./styles.module.scss";

interface ItemsProps {
  id: number;
  expiration: string;
  name: string;
  amount: number;
  status: string;
  amountFormatted?: string;
}

function App() {
  const [items, setItems] = useState<ItemsProps[]>([
    {
      id: 1,
      expiration: "02/03/2021",
      name: "João Henrique",
      amount: 134,
      status: "Pago",
    },
    {
      id: 2,
      expiration: "02/04/2021",
      name: "Lebron James",
      amount: 334,
      status: "Pago",
    },
    {
      id: 3,
      expiration: "02/05/2021",
      name: "Kevin Durant",
      amount: 434,
      status: "A vencer",
    },
    {
      id: 4,
      expiration: "02/06/2021",
      name: "Stephen Curry",
      amount: 234,
      status: "Atrasado",
    },
  ]);
  const [itemValue, setItemValue] = useState("");
  const [activeTabe, setActiveTabe] = useState(1);
  const [activeItems, setActiveItems] = useState<ItemsProps[]>([]);

  useEffect(() => {
    function fetchData() {
      setItems(
        items.map((item) => ({
          ...item,
          amountFormatted: new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(item.amount),
        }))
      );

      setActiveItems(
        items.map((item) => ({
          ...item,
          amountFormatted: new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(item.amount),
        }))
      );

      const itemsAmountTotal = items.reduce(
        (acc, item) => {
          acc.total += Number(item.amount);

          return acc;
        },
        {
          total: 0,
        }
      );

      setItemValue(
        new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(itemsAmountTotal.total)
      );
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSwitchTabs(id: number, status?: string) {
    setActiveTabe(id);

    if (id === 1) {
      setActiveItems(items);
      const itemsAmountTotal = items.reduce(
        (acc, item) => {
          acc.total += Number(item.amount);

          return acc;
        },
        {
          total: 0,
        }
      );

      setItemValue(
        new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(itemsAmountTotal.total)
      );
    } else {
      const itemsAmountTotal = activeItems.reduce(
        (acc, item) => {
          acc.total += Number(item.amount);

          return acc;
        },
        {
          total: 0,
        }
      );

      setItemValue(
        new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(itemsAmountTotal.total)
      );
      setActiveItems(items.filter((item) => item.status === status));
    }
  }

  return (
    <Router>
      <Header />

      <div className={styles.container}>
        <div className={styles.content}>
          <Link to="/" className={styles.goBackButton}>
            <FaChevronLeft size={18} />
            Voltar
          </Link>

          <div className={styles.subContainer}>
            <section className={styles.searchContainer}>
              <div className={styles.description}>
                <h2>Relação de cobranças recebidas</h2>
                <p>De 07/02/2021 até 04/03/2021</p>
              </div>

              <form>
                <div className={styles.inputSearch}>
                  <input type="text" placeholder="Buscar" />
                  <FaSearch className={styles.icon} size={20} />
                </div>

                <select>
                  <option value="7">7 Dias</option>
                  <option value="15">15 Dias</option>
                  <option value="30">30 Dias</option>
                </select>

                <label htmlFor="initial_date">
                  De:
                  <input type="date" name="initial_date" id="initial_date" />
                </label>

                <label htmlFor="final_date">
                  Até:
                  <input type="date" name="final_date" id="final_date" />
                </label>
              </form>
            </section>

            <section className={styles.tabs}>
              <button
                className={activeTabe === 1 ? styles.active : ""}
                type="button"
                onClick={() => handleSwitchTabs(1)}
              >
                Todas as cobranças
              </button>
              <button
                type="button"
                className={activeTabe === 2 ? styles.active : ""}
                onClick={() => handleSwitchTabs(2, "A vencer")}
              >
                Pendentes
              </button>
              <button
                type="button"
                className={activeTabe === 3 ? styles.active : ""}
                onClick={() => handleSwitchTabs(3, "Pago")}
              >
                Pagas
              </button>
            </section>

            <table className={styles.table}>
              <thead>
                <tr>
                  <th>
                    <FaSortAlphaUpAlt />
                    Vencimento
                  </th>
                  <th>
                    <FaSortAlphaUpAlt />
                    Nome do beneficiário
                  </th>
                  <th>
                    <FaSortAlphaUpAlt />
                    Valor
                  </th>
                  <th>Situação</th>
                  <th>Opções</th>
                </tr>
              </thead>

              <tbody>
                {activeItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.expiration}</td>
                    <td>{item.name}</td>
                    <td>{item.amountFormatted}</td>
                    <td
                      style={{
                        color:
                          item.status === "Pago"
                            ? "#04d361"
                            : item.status === "Atrasado"
                            ? "#F22750"
                            : "#888888",
                      }}
                    >
                      {item.status}
                    </td>
                    <td className={styles.options}>
                      <span>
                        <FaPrint size={20} />
                        <FaPaperclip size={20} />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <aside className={styles.summary}>
              <h4>Total</h4>
              <h4>{itemValue}</h4>
            </aside>

            <footer className={styles.footer}>
              <select name="pages" id="pages">
                <option value="10">10 por página</option>
                <option value="20">20 por página</option>
                <option value="30">30 por página</option>
              </select>

              <h5>Total: {activeItems.length} resultados</h5>

              <div className={styles.pagination}>
                <FaChevronLeft size={20} style={{ marginRight: 15 }} />
                <button
                  type="button"
                  className={`${(styles.first, styles.active)}`}
                >
                  1
                </button>
                <button type="button">2</button>
                <button type="button" className={styles.last}>
                  3
                </button>
                <FaChevronRight size={20} style={{ marginLeft: 15 }} />
              </div>
            </footer>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
