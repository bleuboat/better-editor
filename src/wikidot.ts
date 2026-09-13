export function load(doc: Document): void {
  // Anchor
  for (const link of doc.links) {
    if (link.href !== "javascript:;") {
      link.target = "_blank";
    }
    try {
      const url = new URL(link.href);
      if (["localhost", "better-editor.pages.dev"].includes(url.hostname)) {
        url.hostname = "brcn.backroomswiki.cn";
        url.port = "";
        link.href = url.toString();
      }
    } catch {}
  }

  // Account
  const accountTopbutton = doc.getElementById("account-topbutton");
  const accountOptions = doc.getElementById("account-options");

  if (accountTopbutton && accountOptions) {
    accountTopbutton.addEventListener("mousedown", () => {
      accountOptions.style = "display: block;";
    });
    accountOptions.addEventListener("mouseleave", () => {
      accountOptions.style = "display: none;";
    });
  }

  // Search
  const searchInput = doc.querySelector("#search-top-box-input") as HTMLInputElement;
  const searchButton = doc.querySelector("#search-top-box-form .btn") as HTMLInputElement;

  searchButton.addEventListener("click", () => {
    window.open(`https://brcn.backroomswiki.cn/search:site/q/${searchInput.value}`);
  });
}
