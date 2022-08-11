import { Props } from "./../../pages/about";
import ReactMarkdown from "react-markdown";

function About({ strings }: Props) {
  return (
    <main className="prose prose-invert">
      <ReactMarkdown>{strings.richDescription}</ReactMarkdown>
    </main>
  );
}

export default About;
