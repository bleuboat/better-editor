import { Renderer } from "../utils/render.ts";

const REPLACEMENTS = {
  "``" : "&#8220;",
  "''" : "&#8221;",
  ",," : "&#8222;",
  "`" : "&#8216;",
  "'" : "&#8217;",
  "<<" : "&#171;",
  ">>" : "&#187;",
  " " : "&#160;",
  "..." : "&#8230;",
  "---" : "&#8212;",
  "--" : "&#8212;",
};

(class extends Renderer {
  parse(source: string): string {
    source = source.replaceAll(
      /``(.*?)''/g,
      REPLACEMENTS["``"] + '$1' + REPLACEMENTS["''"],
    );
    source = source.replaceAll(
      /,,(.*?)''/g,
      REPLACEMENTS[",,"] + '$1' + REPLACEMENTS["''"],
    );
    source = source.replaceAll(
      /`(.*?)'/g,
      REPLACEMENTS["`"] + '$1' + REPLACEMENTS["'"],
    );
    source = source.replaceAll(
      /<</g,
      REPLACEMENTS["<<"],
    );
    source = source.replaceAll(
      />>/g,
      REPLACEMENTS[">>"],
    );
    source = source.replaceAll(
      /(?<=[0-9]) (?=[0-9])/g,
      REPLACEMENTS[" "],
    )
    source = source.replaceAll(
      /\.\.\.|\. \. \./g,
      REPLACEMENTS["..."],
    )
    source = source.replaceAll(
      /--/g,
      REPLACEMENTS["--"],
    )
    source = source.replaceAll(
      /---/g,
      REPLACEMENTS["---"],
    )
    return source;
  };
}).register("Typography");
