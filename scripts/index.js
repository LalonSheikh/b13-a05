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
    const issueBtn = document.createElement("div");
    issueBtn.innerHTML = `
      <div class="card w-80 bg-base-100 shadow-md border-t-4 border-green-500">
  
  <div class="card-body p-5">
    <div class="flex justify-between items-center">
      <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
      ${issue.priority === "low" ? "✓" : '<i class="fa-regular text-green-400 fa-circle"></i>'}  
      
      </div>

      <span class="badge badge-error badge-outline">${issue.priority} </span>
    </div>

    
    <h2 class="card-title text-base mt-2">
      ${issue.title}
    </h2>

    
    <p class="text-sm text-gray-500">
      ${issue.description}
    </p>

    
    <div class="flex gap-2 mt-2">
      <span class="badge badge-outline badge-error">BUG</span>
      <span class="badge badge-outline badge-warning">HELP WANTED</span>
    </div>

  </div>

  <div class="divider m-0"></div>

  <!-- Footer -->
  <div class="p-4 text-sm text-gray-500">
    <p>#1 by ${issue.author} </p>
    <p>1/15/2024</p>
  </div>

</div>
    
    `;
    issueContainer.append(issueBtn);
  }
};
loadIssues();
