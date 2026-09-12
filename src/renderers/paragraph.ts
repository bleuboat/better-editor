import { DELIM, RENDERERS, Renderer } from "../utils/render.ts";

export class Paragraph extends Renderer {
  regex = /^.*?\n\s*?\n/gms;

  process = (...matches: string[]) => {
    const match = matches[0].trim();
    if (!match) {
      return "";
    }
    if (match[0] !== DELIM) {
      const start = this.token({ type: "start" });
      const end = this.token({ type: "end" });
      return `${start}${matches[0]}${end}\n\n`;
    }
    return matches[0];
  };

  render = (options: { [key: string]: unknown }) => {
    const type = options.type;
    if (type === "start") {
      return "<p>";
    }
    return "</p>";
  };
}

RENDERERS.set("Paragraph", Paragraph);
