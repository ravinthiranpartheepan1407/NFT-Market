import React from "react";
import CybornHeader from "/components/CybornHeader";
import CybornFooter from "/components/CybornFooter";
import Head from "next/head";
import Script from "next/script"
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
        <div className="lg:grid grid-cols-2 grid-gap-4 lg:ml-40">
        <div className="grid grid-cols-1 grid-gap-4">
          <blockquote className="twitter-tweet"><p lang="en" dir="ltr">Launching Arkhamm NFT Marketplace on Polygon main network tomorrow at 09:00 (EET) Stay tuned!</p>&mdash; Ravinthiran (@surenravi1407) <a href="https://twitter.com/surenravi1407/status/1507022983323291651?ref_src=twsrc%5Etfw">March 24, 2022</a></blockquote> <Script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></Script>
          <blockquote className="twitter-tweet"><p lang="en" dir="ltr">We are live🥳🤟!! We have successfully launched our NFT marketplace on polygon network.<br />Our Features:<br />- Low Gas Fee - Easy to create NFTs <br />- Simple &amp; Elegant UI - IPFS Integration<br />- Low Market Fees - Royalties (5%)<br />Link: <a href="https://t.co/ktkFBTBRrc">https://t.co/ktkFBTBRrc</a> <a href="https://t.co/uMAg70PiS1">pic.twitter.com/uMAg70PiS1</a></p>&mdash; Arkhamm (@arkhamm1407) <a href="https://twitter.com/arkhamm1407/status/1507258105079377921?ref_src=twsrc%5Etfw">March 25, 2022</a></blockquote> <Script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></Script>
          <blockquote className="twitter-tweet"><p lang="en" dir="ltr">Get ready to mint our tokens! We are launching it today at 18:00 (EET)🤟🥳</p>&mdash; Arkhamm (@arkhamm1407) <a href="https://twitter.com/arkhamm1407/status/1507348896460075009?ref_src=twsrc%5Etfw">March 25, 2022</a></blockquote> <Script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></Script>
        </div>
        <div className="grid grid-cols-1 grid-gap-4">
          <blockquote className="twitter-tweet"><p lang="en" dir="ltr">Launching Arkhamm NFT Marketplace on Polygon main network tomorrow at 09:00 (EET) Stay tuned!</p>&mdash; Ravinthiran (@surenravi1407) <a href="https://twitter.com/surenravi1407/status/1507022983323291651?ref_src=twsrc%5Etfw">March 24, 2022</a></blockquote> <Script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></Script>
          <blockquote className="twitter-tweet"><p lang="en" dir="ltr">We are live🥳🤟!! We have successfully launched our NFT marketplace on polygon network.<br />Our Features:<br />- Low Gas Fee - Easy to create NFTs <br />- Simple &amp; Elegant UI - IPFS Integration<br />- Low Market Fees - Royalties (5%)<br />Link: <a href="https://t.co/ktkFBTBRrc">https://t.co/ktkFBTBRrc</a> <a href="https://t.co/uMAg70PiS1">pic.twitter.com/uMAg70PiS1</a></p>&mdash; Arkhamm (@arkhamm1407) <a href="https://twitter.com/arkhamm1407/status/1507258105079377921?ref_src=twsrc%5Etfw">March 25, 2022</a></blockquote> <Script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></Script>
          <blockquote className="twitter-tweet"><p lang="en" dir="ltr">Get ready to mint our tokens! We are launching it today at 18:00 (EET)🤟🥳</p>&mdash; Arkhamm (@arkhamm1407) <a href="https://twitter.com/arkhamm1407/status/1507348896460075009?ref_src=twsrc%5Etfw">March 25, 2022</a></blockquote> <Script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></Script>
        </div>
        </div>
        <br />
        <br />
      <CybornFooter />
    </div>
  )
}

export default home;
