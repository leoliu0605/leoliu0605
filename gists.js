const fetch = require("node-fetch");
const fs = require("fs");

fetch(`https://api.github.com/users/leoli0605/gists`)
  .then((response) => {
    return response.json();
  })
  .then((gists) => {
    let markdown = gists
      .map((gist) => {
        let filenames = Object.keys(gist.files).join(", ");
        return `- [${filenames}](${gist.html_url})`;
      })
      .join("\n");
    let readme = fs.readFileSync("README.md", "utf8");
    let before = readme.substring(
      0,
      readme.indexOf("<!-- GISTS_START -->") + "<!-- GISTS_START -->".length
    );
    let after = readme.substring(readme.indexOf("<!-- GISTS_END -->"));
    fs.writeFileSync("README.md", `${before}\n\n${markdown}\n${after}`);
  })
  .catch((error) => {
    console.log(error);
  });
