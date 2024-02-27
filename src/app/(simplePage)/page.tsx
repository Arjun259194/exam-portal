import Hero from "@/components/LandingPage/Hero";
import Features from "@/components/LandingPage/Features";
import User from "@/components/LandingPage/User";
import Button from "@/components/UI/Button";
import toast from "react-hot-toast";
import Temp from "@/components/Temp";

export default function Home() {
  return (
    <>
      <main className="">
        <Hero />
        <Features />
        <User />
      </main>
    </>
  );
}