export function printUser(number: string, title: string, name: string): string {
  return `
    <span class="printuser">
      <a href="http://www.wikidot.com/user:info/${name}">
        <img
          class="small"
          src="https://www.wikidot.com/avatar.php?userid=${number}&amp;size=small&amp;timestamp=${Date.now()}"
          alt="bleuboat" style="background-image:url(https://www.wikidot.com/userkarma.php?u=${number})"
        >
      </a>
      ${title}
    </span>
  `;
}
