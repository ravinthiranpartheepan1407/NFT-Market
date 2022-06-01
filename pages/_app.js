import '../styles/globals.css'
import Script from "next/script"
import nProgress from "nprogress";
import "/styles/progress.css"
import Router from "next/router";

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);


function MyApp({ Component, pageProps }) {
  return(
      <div>
      <Script
          id="google-analytics"
          src="https://www.googletagmanager.com/gtag/js?id=G-NMJ0FZRYN2"
          onLoad={() => {
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NMJ0FZRYN2');
          }}
        />
      <Component {...pageProps} />
     </div>
   )
}

export default MyApp
