const loadIssues = () => {
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayIssues(data.data));
};
const displayIssues = (issues) => {
  const issueContainer = document.getElementById("issue-container");
//   issueContainer.innerHTML = "";
  for (const issue of issues) {
    console.log(issue);

  }
};
loadIssues();
