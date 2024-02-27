import { BookType, GraduationCap, LogIn, LucideIcon } from "lucide-react";
import React, { ReactNode } from "react";
import IconButton from "../UI/IconButton";
import Link from "next/link";

interface CardProps {
  role: "Student" | "Teacher";
  children: ReactNode;
  title: string;
  Icon: LucideIcon;
}

const Card: React.FC<CardProps> = ({ Icon, role, children, title }) => {
  return (
    <div className=" border border-green-500 shadow-xl shadow-green-300 rounded-lg p-5 flex flex-col items-center text-center space-y-3">
      <Icon className="size-28" />
      <h3 className="text-4xl capitalize underline underline-offset-2 font-semibold">
        {title}
      </h3>
      <p className="leading-relaxed text-gray-600">{children}</p>
      <IconButton
        className="gap-3 text-xl"
        Icon={LogIn}
        variant="secondary"
        reverse={true}
      >
        <Link href="/auth/login">Get Started as a {role}</Link>
      </IconButton>
    </div>
  );
};

const User = () => {
  return (
    <section className="bg-gray-50">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#22c55e"
          fillOpacity="1"
          d="M0,256L40,266.7C80,277,160,299,240,298.7C320,299,400,277,480,250.7C560,224,640,192,720,176C800,160,880,160,960,154.7C1040,149,1120,139,1200,149.3C1280,160,1360,192,1400,208L1440,224L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
        ></path>
      </svg>
      <div className="container mx-auto p-5">
        <h2 className="capitalize text-center text-5xl">
          Can you use{" "}
          <span className="underline underline-offset-1 font-bold">
            Examify
          </span>
          ?
        </h2>
        <div className="flex gap-5 p-10">
          <Card Icon={GraduationCap} role="Student" title="Join us as student">
            Joining Examify as a student opens up a myriad of possibilities as
            you embark on a journey to seamlessly integrate it into your
            academic life as a dedicated digital exam center. This dynamic
            platform not only welcomes you but also ensures that your experience
            is characterized by user-friendly features, promoting both
            simplicity and effectiveness throughout the entire examination
            process. With Examify, the transition to a digital exam environment
            becomes an effortlessly streamlined experience, providing students
            with a comprehensive and efficient tool for academic assessments.
          </Card>
          <Card Icon={BookType} role="Teacher" title="Join us as teacher">
            Educators can seamlessly integrate into the Examify platform, where
            they have the ability to join and establish a straightforward and
            user-friendly approach for managing both individual tests and
            comprehensive exams. This versatile system empowers teachers to
            navigate through their academic responsibilities with ease,
            providing a streamlined and efficient solution for handling personal
            assessments and examinations. Examify becomes a facilitator of
            simplicity, offering educators a platform that simplifies the
            process of test creation and management, ultimately enhancing the
            overall teaching and assessment experience.
          </Card>
        </div>
      </div>
    </section>
  );
};

export default User;
