from pathlib import Path
from re import MULTILINE, compile

RULES = [
    "Include",
    "Prefilter",
    "Delimiter",
    "Code",
    "Form",
    "Raw",
    "Rawold",
    "Modulepre",
    "Module",
    "Module654",
    "Iftags",
    "Comment",
    "Iframe",
    "Date",
    "Math",
    "Concatlines",
    "Freelink",
    "Equationreference",
    "Footnote",
    "Footnoteitem",
    "Footnoteblock",
    "Bibitem",
    "Bibliography",
    "Bibcite",
    "Divprefilter",
    "Anchor",
    "User",
    "Blockquote",
    "Heading",
    "Toc",
    "Horiz",
    "Separator",
    "Clearfloat",
    "Break",
    "Span",
    "Size",
    "Div",
    "Divalign",
    "Collapsible",
    "Tabview",
    "Note",
    "Gallery",
    "List",
    "Deflist",
    "Table",
    "Tableadv",
    "Button",
    "Image",
    "Embed",
    "Social",
    "File",
    "Center",
    "Newline",
    "Paragraph",
    "Url",
    "Email",
    "Mathinline",
    "Interwiki",
    "Colortext",
    "Strong",
    "Emphasis",
    "Underline",
    "Strikethrough",
    "Tt",
    "Superscript",
    "Subscript",
    "Typography",
    "Tighten",
]

renderers = Path("src/renderers")
wikidot = Path("Wikidot/Parse")

renderers.mkdir(exist_ok=True)

init = []

pattern = compile(r"""^\s*public\s*\$regex\s*=\s*(['"])([/;]?)(.+?)\2([A-Za-z]*?)\1;""", MULTILINE)
pattern2 = compile(r"""(?<!\\)/""")

for old_renderer in wikidot.iterdir():
    stem = old_renderer.stem
    if stem not in RULES:
        continue
    name = f"{stem.lower()}.ts"
    new_renderer = renderers / name
    old = old_renderer.read_text(encoding="utf-8")
    regex = pattern.search(old)
    if regex:
        regex = f"\n  regex = /{pattern2.sub("\\/",
          regex[3].replace("\\>", ">")).replace("\\-\\-", "--").replace("{", "\\{").replace("}", "\\}")
        }/{regex[4].lower()}g;\n"
    else:
        regex = ""
    if "?R" in regex:
        regex = regex.replace("(?:(?R)|.)", ".")
        regex += "  recursion = true;\n"
#     new_renderer.write_text(rf"""import {{ Renderer }} from "../utils/render.ts";

# (class extends Renderer {{{regex}
#   process = (...matches: string[]): string => {{
#     return matches[0];
#   }};

#   render = (_options: {{ [key: string]: unknown }}): string => {{
#     return "";
#   }};
# }}).register("{stem}");
# """, encoding="utf-8")
    init.append(f'import "./renderers/{name}";\n')

Path("src/renderers.ts").write_text("".join(init))
