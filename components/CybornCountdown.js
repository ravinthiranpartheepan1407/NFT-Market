import React, { Component } from "react";
import {useEffect, useState} from "react";
import { useRouter } from 'next/router';
import Link from "next/link";

class CybornCountdown extends Component {

  constructor(props) {
    super(props);
    this.count = this.count.bind(this);
    this.state = {
      days: 0,
      minutes: 0,
      hours: 0,
      secounds: 0,
      time_up: ""
    };
    this.x = null;
    this.deadline = null;
  }

  count() {
    var now = new Date().getTime();
    var t = this.deadline - now;
    var dd = Math.floor(t / (1000 * 60 * 60 * 24 * 30));
    var hh = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var mm = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    var ss = Math.floor((t % (1000 * 60)) / 1000);

    var days = dd < 10 ? "0" + dd : dd;
    var hours = hh < 10 ? "0" + hh : hh;
    var minutes = mm < 10 ? "0" + mm : mm;
    var seconds = ss < 10 ? "0" + ss : ss;

    this.setState({ days, minutes, hours, seconds });

    if (t < 0) {
      clearInterval(this.x);
      this.setState({
        days: 0,
        minutes: 0,
        hours: 0,
        seconds: 0,
        time_up: "TIME IS UP"
      });
    }
  }

  componentDidMount() {
    this.deadline = new Date("Oct 08, 2022 21:00:00").getTime();

    this.x = setInterval(this.count, 1000);
  }

  render() {
    const { days, seconds, hours, minutes } = this.state;


    return (
      <div className="backgroundImg min-w-screen min-h-screen bg-gradient-to-r from-cybornheader to-bg-purple-900 flex items-center justify-center px-5 py-5" id="countdown">
    <div className="text-white">
        <h1 className="text-3xl text-center mb-3 font-extralight">When will Arkhamm Web3 launch?*</h1>
        <br />
        <div className="text-6xl text-center flex w-full items-center justify-center">
            <div className="text-2xl mr-1 font-extralight">in</div>
            <div className="w-20 mx-1 p-1 bg-white text-black rounded-lg">
                <div className="font-mono leading-none" id="day">{days}</div>
                <div className="font-mono uppercase text-sm leading-none">Days</div>
            </div>
            <div className="w-20 mx-1 p-1 bg-white text-black rounded-lg">
                <div className="font-mono leading-none" id="hour">{hours}</div>
                <div className="font-mono uppercase text-sm leading-none">Hours</div>
            </div>
            <div className="w-20 mx-1 p-1 bg-white text-black rounded-lg">
                <div className="font-mono leading-none" id="minute">{minutes}</div>
                <div className="font-mono uppercase text-sm leading-none">Minutes</div>
            </div>
            <div className="text-2xl mx-1 font-extralight">and</div>
            <div className="w-20 mx-1 p-1 bg-white text-black rounded-lg">
                <div className="font-mono leading-none" id="second">{seconds}</div>
                <div className="font-mono uppercase text-sm leading-none">Seconds</div>
            </div>
        </div>
        <br />
        <br />
        <div className="lg:grid grid-cols-3">
          <div className="ml-16 w-72 h-16 py-6 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 shadow-lg shadow-lime-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
            <Link href="/launchmint/whitelist">Claim Your DAO Membership</Link>
          </div>
          <div className="ml-16 w-72 h-16 py-6 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 shadow-lg shadow-lime-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
            <Link href="/services/apps">Dashboard</Link>
          </div>

          <div className="ml-16 w-72 h-16 py-6 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 shadow-lg shadow-lime-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
            <Link href="#">Quant-Block Encryption</Link>
          </div>

        </div>
    </div>

</div>
    );
  }
}

export default CybornCountdown;
