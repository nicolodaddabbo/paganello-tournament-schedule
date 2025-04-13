import "./style/index.css";
import "./style/match.css";
import "./style/schedule.css";
import "./style/search.css";
import Head from "next/head";
import { Bricolage_Grotesque } from "next/font/google";

const grotesk = Bricolage_Grotesque({ subsets: ["latin"] });

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="keywords" content="paganello, schedule, ultimate" />
        <meta name="author" content="Nicolò D'Addabbo" />
        <title>Schedule Paganello 2025</title>
      </Head>
      <main className={grotesk.className}>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
