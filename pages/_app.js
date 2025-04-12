// import '../styles/globals.css'
import './style/index.css'
import './style/match.css'
import './style/schedule.css'
import './style/search.css'
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta name="keywords" content="paganello, schedule, ultimate" />
        <meta name="author" content="Nicolò D'Addabbo" />
        <title>Schedule Paganello 2025</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
