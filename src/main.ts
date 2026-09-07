const input = document.getElementById("input");
const output = document.getElementById("output");

if (!(input instanceof HTMLTextAreaElement)) { throw TypeError; }
if (!(output instanceof HTMLIFrameElement)) { throw TypeError; }

input.addEventListener("input", function(event: InputEvent): void {
  const target = event.target;
  if (!(target instanceof HTMLTextAreaElement)) { throw TypeError; }

  const source = target.value;

  output.srcdoc = source;
})
