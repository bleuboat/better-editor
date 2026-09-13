import { Renderer } from "../utils/render.ts";

(class extends Renderer {
  regex = /\n\= (.*?)$/mg;

  process = (...matches: string[]): string => {
    const start = this.token({ type: "start" });
    const end = this.token({ type: "end" });
    return "\n\n" + start + matches[1] + end + "\n\n";
  };

  render = (options: { [key: string]: unknown }): string => {
    if (options.type === 'start') {
      return '<p style="text-align: center;">';
    }
    return '</p>';
  };
}).register("Center");
