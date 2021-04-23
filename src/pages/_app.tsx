// ------------------estilos
import "../styles/global.scss";
import styles from "../styles/app.module.scss"; // importando o estilo do app

// ------------------módulos
import { Header } from "../components/Header"; //importando o header
import { Player } from "../components/Player"; // importando o player
import { PlayerContextProvider } from "../contexts/PlayerContext";

function MyApp({ Component, pageProps }) {
  return (
    <PlayerContextProvider>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContextProvider>
  );
}

export default MyApp;
