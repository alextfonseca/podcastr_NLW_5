// importando a data atual do brasil com a biblioteca date-fns
import format from "date-fns/format";
import ptBR from "date-fns/locale/pt-BR";

import styles from "./styles.module.scss"; // importando o sass do header

export function Header() {
  // mostra a data no formato brasileiro, exemplo: Ter, 20 Abril
  const currentDate = format(new Date(), "EEEEEE, d MMMM", { locale: ptBR });

  return (
    <header className={styles.headerContainer}>
      <img src="/logo.svg" alt="logo da podcastr" />

      <p>O melhor para você ouvir sempre.</p>

      <span>{currentDate}</span>
    </header>
  );
}
