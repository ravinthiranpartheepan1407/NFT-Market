import React from "react";
import CybornHeader from "/components/CybornHeader";
import CybornFooter from "/components/CybornFooter";
import Head from "next/head";
function home(){
  return(
    <div>
    <Head>
      <title>Arkhamm Web3</title>
      <meta name="description" content="Arkhamm Blockchain" />
      <link rel="apple-touch-icon" sizes="180x180" href="/ark.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/ark.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/ark.png" />
    </Head>
      <CybornHeader />
      <br />
      <br />
        <div className="lg:grid grid-cols-3 grid-gap-4 flex justify-center items-center">
          <blockquote className="twitter-tweet"><p lang="en" dir="ltr">Launching Arkhamm NFT Marketplace on Polygon main network tomorrow at 09:00 (EET) Stay tuned!</p>&mdash; Ravinthiran (@surenravi1407) <a href="https://twitter.com/surenravi1407/status/1507022983323291651?ref_src=twsrc%5Etfw">March 24, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
        </div>
        <br />
        <br />
      <CybornFooter />
    </div>
  )
}

export default home;
