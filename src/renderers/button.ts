import { Renderer } from "../utils/render.ts";

(class extends Renderer {
  regex = /\[\[button\s+([a-z0-9\-_]+)(?:\s+(.+?))?\]\]/isg;

  process = (...matches: string[]): string => {
    let type = matches[1];
    const attrString = matches[2];
    const attr = this.attrs(attrString.trim());

    const allowedAttrs = ["text", "class", "style"];
    const options: { [key: string]: string } = {};

    for (const aa of allowedAttrs) {
      if (Object.hasOwn(attr, aa)) {
        options[aa] = attr[aa];
      }
    }

    options["type"] = type;

    return this.token(options);
  };

  render = (options: { [key: string]: unknown }): string => {
    	const allowedTypes = [
    		"edit",
    		"edit_append",
    		"edit_sections",
    		"history",
    		"print",
    		"files",
    		"tags",
    		"source",
    		"talk",
    		"backlinks",
      ];

    	const defaultText: { [key: string]: string } = {
        "edit": "edit",
        "edit_append": "append",
        "edit_sections": "edit sections",
        "history": "history",
        "print": "print",
        "files": "files",
        "tags": "tags",
        "source": "view source",
        "talk": "talk",
        "backlinks": "backlinks",
      };

    	if (!allowedTypes.includes(options.type as string)) {
    		return this.error("The button type is not recognized");
    	}

    	if (!options.class) {
    		options.class = "wiki-standalone-button";
    	}

    	if (!options.text) {
    		options.text = defaultText[options.type as string];
    	}

    	const out = document.createElement("a");
      out.className = options.class as string;
    	if (options.style) {
    		out.style = options.style as string;
    	}
      out.href = "javascript:;";
    	out.innerText = options.text as string;

    	return out.outerHTML;
  };
}).register("Button");
