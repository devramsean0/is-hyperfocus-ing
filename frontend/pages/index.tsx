import LandingCSS from "@/styles/landing.module.css";
import { Tektur } from "next/font/google";
import { TextInput } from "./components/TextInput";

const tektur = Tektur()

export default function Home() {
  return (
    <main className={`${LandingCSS.mainContent} ${tektur.className}`}>
      <h1 className="titleText">is.hyperfocus.ing</h1>
      <p>A free subdomain and email forwarding service for Neurodivergent folks</p>
      <TextInput placeholder="your username" id="username" onSubmit={(ctx) => {}}/>
      <text className="descriptionText">
        How does it work?
        <ol className={LandingCSS.numList}>
          <li>You create an account and apply using this site</li>
          <li>You configure your initial DNS records</li>
          <li>Applications are manually reviewed by a human</li>
          <li>Your site and email become alive and active</li>
        </ol>
      </text>
    </main>
  );
}
