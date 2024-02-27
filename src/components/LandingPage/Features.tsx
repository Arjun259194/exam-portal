import {
  Gauge,
  Handshake,
  Mail,
  MonitorCheck,
  MousePointerSquare,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import React from "react";

interface Props {
  title: string;
  text: string;
  Icon: LucideIcon;
  index: number;
}

const Card: React.FC<Props> = ({ title, Icon, text }) => {
  return (
    <article
      className={`
    hover:bg-green-100 
    bg-gray-50 border-gray-200 border-2 shadow-md shadow-white/50 flex flex-col items-center justify-center
      p-10 space-y-3 rounded-[52px] hover:rounded-xl transition-all duration-150
    `}
    >
      <div className="flex items-center justify-evenly w-full">
        <Icon className="size-24" />
        <span className="text-3xl capitalize font-semibold ">{title}</span>
      </div>

      <p className="text-center text-lg">{text}</p>
    </article>
  );
};

const Features = () => {
  const cardData: { title: string; text: string; Icon: LucideIcon }[] = [
    {
      title: "Speed",
      text: "High performace with server side rendered data and fast loading.",
      Icon: Gauge,
    },
    {
      title: "Security",
      text: "Strong authentication system with multilevel authentication",
      Icon: ShieldCheck,
    },
    {
      title: "Email Service",
      text: "Regular notifications and security updates on your email address",
      Icon: Mail,
    },
    {
      title: "User Interface",
      text: "User friendly and modern interface with hight speed UI updates",
      Icon: MonitorCheck,
    },
    {
      title: "Support",
      text: "Friendly tech support team available 24x7 for teacher and students",
      Icon: Handshake,
    },
    {
      title: "Availability",
      text: "Supported for multiple browsers and devices across different platform",
      Icon: MousePointerSquare,
    },
  ];

  return (
    <section className="bg-green-500 w-full">
      {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#f9fafb"
          fill-opacity="1"
          d="M0,0L60,42.7C120,85,240,171,360,192C480,213,600,171,720,160C840,149,960,171,1080,160C1200,149,1320,107,1380,85.3L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        ></path>
      </svg> */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#f9fafb"
          fillOpacity="1"
          d="M0,224L60,197.3C120,171,240,117,360,133.3C480,149,600,235,720,234.7C840,235,960,149,1080,128C1200,107,1320,149,1380,170.7L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        ></path>
      </svg>
      <div className="container flex flex-col items-center mx-auto">
        <div className="space-y-5 flex flex-col items-center">
          <h2 className="text-center text-5xl capitalize font-semibold text-gray-50">
            Why should you choose{" "}
            <span className="font-bold underline underline-offset-1">
              examify
            </span>
            ?
          </h2>
          <p className="text-xl text-gray-100">
            Examify is an all in one solution for schools and collages across
            india.
          </p>
        </div>

        <div className="grid grid-cols-3 w-full p-5 gap-5">
          {cardData.map((d, i) => {
            return <Card index={i} {...d} key={i} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
