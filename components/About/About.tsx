import { Props } from "./../../pages/about";
import ReactMarkdown from "react-markdown";

function About({ strings }: Props) {
  return (
    <main className="prose prose-invert mx-auto">
      <h1 className="text-center p-2 mb-4">{strings.pageTitle}</h1>
      <ReactMarkdown>{strings.richDescription}</ReactMarkdown>
    </main>
  );
}

export default About;
