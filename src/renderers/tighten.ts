import { Renderer } from "../utils/render.ts";

(class extends Renderer {
  parse(source: string): string {
    return source.replaceAll("\n", "");
  };
}).register("Tighten");
