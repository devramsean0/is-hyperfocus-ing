import LandingCSS from "@/styles/landing.module.css";
import { TextInput } from "../components/TextInput";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  return (
    <main className="mainContent verticalCenter">
      <h1 className={LandingCSS.titleText}>is.hyperfocus.ing</h1>
      <p>A free subdomain and email forwarding service for Neurodivergent folks</p>
      <TextInput placeholder="your username" id="username" nextButton onNext={(ctx) => {
        const username = (document.getElementById("username") as HTMLInputElement).value;
        router.push(`/apply?username=${username}`);
      }}/>
      <text className={LandingCSS.descriptionText}>
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
