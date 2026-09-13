import { Renderer } from "../utils/render.ts";

(class extends Renderer {
  parse(source: string): string {
    source = source.replaceAll("\r\n", "\n");
    source = source.replaceAll("\r", "\n");
    source = source.replaceAll(/^\s+$/mg, "");
    source = source.replaceAll("\t", "    ");
    source = "\n" + source + "\n\n";
    source = source.replaceAll(/(\n[ ]*){3,}/mg, "\n\n");
    source = source.replaceAll("\xFC\xFC", "");
    return source
  };
}).register("Prefilter");
