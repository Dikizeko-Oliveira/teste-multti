import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaChevronDown,
  FaChevronUp,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";

import styles from "./styles.module.scss";

export function Header() {
  const [toggleProfile, setToggleProfile] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1>
          <span>bys</span>360
        </h1>
      </div>

      <ul className={styles.navigation}>
        <li className={styles.navlink}>
          <NavLink to="/" activeClassName={styles.active}>
            Cobranças recebidas
          </NavLink>
        </li>

        <li className={styles.profile}>
          <div
            className={styles.avatarContainer}
            onClick={() => setToggleProfile(!toggleProfile)}
          >
            <div className={styles.avatar}>
              <FaUser />
            </div>
            <div className={styles.user}>
              <h4>Nome do usuário</h4>
              <span>398 *** *** **</span>
            </div>
            {toggleProfile ? (
              <FaChevronUp size={20} />
            ) : (
              <FaChevronDown size={20} />
            )}
          </div>

          <div
            className={styles.menu}
            style={{ display: toggleProfile ? "block" : "none" }}
          >
            <div className={styles.menuContainer}>
              <div className={styles.avatarMenu}>
                <FaUser />
              </div>
              <div className={styles.user}>
                <h4>Nome do usuário</h4>
                <span>398 *** *** **</span>
              </div>
            </div>

            <section>
              <NavLink to="/" className={styles.menuOption}>
                Meu perfil
              </NavLink>
              <NavLink to="/" className={styles.menuOption}>
                Alterar senha
              </NavLink>

              <button>
                Sair
                <FaSignOutAlt size={20} />
              </button>
            </section>
          </div>
        </li>
      </ul>
    </header>
  );
}
