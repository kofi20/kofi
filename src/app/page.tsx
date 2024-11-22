import { Metadata } from "next";
import Image from "next/image";
import profile from "@/assets/profile.jpeg";
import { Bot } from "lucide-react";
import { H1 } from "@/components/ui/H1";
import { H2 } from "@/components/ui/H2";

export const metadata: Metadata = {
  title: "Isadru Santos - My AI-Powered portifolio",
};

export default function Home() {
  return (
    <section className="space-y-16 bg-[url('/background.png')] bg-cover bg-center bg-no-repeat px-1 py-8">
      <section className="grid grid-cols-1 items-center gap-8 sm:grid-cols-2">
        <div className="space-y-3">
          <H1 className="text-center sm:text-start">Hi, Santos here 👋🏾</H1>

          <p className="text-center sm:text-start">
            I&apos;m an AI/ML engineer with extensive experience working on a
            variety of data science, data analysis, and large language model
            (LLM) projects. I am passionate about all things AI and data-driven,
            constantly exploring new advancements in the field.
          </p>
        </div>

        <div className="flex justify-center">
          <Image
            height={300}
            width={300}
            src={profile}
            alt={"my profile"}
            className="aspect-square rounded-full border-2 object-cover shadow-md dark:border-foreground"
          />
        </div>
      </section>
      <section className="space-y-3 text-center">
        <H2>Chat with my AI-powered self</H2>

        <p>
          Click the little icon <Bot className="inline pb-1" /> to activate the
          AI chatbot. You can ask it questions about me, the projects I've
          worked on, and it will pull relevant information from this website.
          The bot can also provide helpful links to guide you to more detailed
          information.
        </p>
      </section>
    </section>
  );
}
