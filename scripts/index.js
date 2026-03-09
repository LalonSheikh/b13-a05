const onlyDate = (date) => {
  return new Date(date).toLocaleDateString();
};
const createLabels = (arr) => {
  const htmlLabels = arr.map((label) => {
    let badge = "";

    if (label === "bug") {
      badge = "badge-error";
    } else {
      badge = "badge-warning";
    }

    return `<span class="badge badge-outline ${badge}">${label}</span>`;
  });

  return htmlLabels.join("");
};
//
// const createLabels = (arr) => {
//   const htmlLabels = arr.map(

//     (label) => `<span class="btn gap-2 ml-2" >${label}</span>`,
//   );
//   return htmlLabels.join("");
// };

const loadIssues = (status) => {
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayIssues(data.data, status));
};

const displayIssues = (issues, status) => {
  const issueContainer = document.getElementById("issue-container");
  const totalCount = document.getElementById("total-count");
  issueContainer.innerHTML = "";
  if (status === "open") {
    issues = issues.filter((issue) => issue.status === "open");
  } else if (status === "closed") {
    issues = issues.filter((issue) => issue.status === "closed");
  } else {
    issues;
  }
  totalCount.innerText = issues.length;
  for (const issue of issues) {
    console.log(issue);
    const borderTopColor =
      issue.status === "open" ? "border-green-500" : "border-purple-500";

    const issueBtn = document.createElement("div");
    issueBtn.innerHTML = `
      <div class="card w-full bg-base-100 shadow-md border-t-4 ${borderTopColor}">
  
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
    ${createLabels(issue.labels)}
      
      
    </div>

  </div>

  <div class="divider m-0"></div>

  <div class="p-4 text-sm text-gray-500">
    <p>#1 by ${issue.author} </p>
    <p>${onlyDate(issue.createdAt)}</p>
  </div>

</div>
    
    `;
    issueContainer.append(issueBtn);
  }
};
loadIssues();
