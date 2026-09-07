import { Page } from "./page.ts";

const input = document.getElementById("input");
const output = document.getElementById("output");

if (!(input instanceof HTMLTextAreaElement)) throw TypeError;
if (!(output instanceof HTMLIFrameElement)) throw TypeError;

input.addEventListener("input", function(event: InputEvent): void {
  const target = event.target as HTMLTextAreaElement;
  const source = target.value;
  const page = new Page();
  output.srcdoc = page.render(source);
})
