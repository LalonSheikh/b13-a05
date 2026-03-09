document.getElementById("signin-btn").addEventListener("click", function () {
  console.log("signin button clicked");
  const userNumber = document.getElementById("user-number");
  const userNumberValue = userNumber.value;
  const passwordNumber = document.getElementById("password-number");
  const passwordNumberValue = passwordNumber.value;
  console.log(userNumberValue, passwordNumberValue);
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  if (userNumberValue === "admin" && passwordNumberValue === "admin123") {
    alert("Signin Successful");
    modalTitle.innerText = "Wow!!! Excellent";
    modalDescription.innerText = "Signin successful";
    document.getElementById("login-modal").showModal();
    document.getElementById("header-section").classList.add("hidden");
    document.getElementById("main-section").classList.remove("hidden");
    /////////////////////////

    const manageSpinner = (status) => {
      const spinner = document.getElementById("spinner");

      if (status) {
        spinner.classList.remove("hidden");
      } else {
        spinner.classList.add("hidden");
      }
    };

    const removeActive = (event) => {
      const issueTabs = document.querySelectorAll(".issue-tab");

      issueTabs.forEach((tab) => {
        tab.classList.remove("tab-active", "bg-blue-500", "text-white");
      });

      event.target.classList.add("tab-active", "bg-blue-500", "text-white");
    };
    //
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

        return `<span class="badge badge-outline bg-yellow-200 text-white ${badge}">${label}</span>`;
      });

      return htmlLabels.join("");
    };

    const loadIssues = (status) => {
      manageSpinner(true);
      const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          displayIssues(data.data, status);
          manageSpinner(false);
        });
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
      <div onclick="loadSingleIssue(${issue.id})"  class="card w-full bg-base-100 shadow-md border-t-4 ${borderTopColor}">
  
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

    const loadSingleIssue = async (id) => {
      const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
      const res = await fetch(url);
      const detail = await res.json();
      displaySingleIssue(detail.data);
    };
    const displaySingleIssue = (data) => {
      const singleIssueContainer = document.getElementById(
        "issue-details-container",
      );
      singleIssueContainer.innerHTML = `
  <div class="space-y-4">

    <h2 class="text-2xl font-bold">${data.title}</h2>

    <div class="flex items-center gap-3 text-sm">
      <span class="badge badge-success">${data.status}</span>
      <span class="text-gray-500">Opened by ${data.author}</span>
      <span class="text-gray-400">${onlyDate(data.createdAt)}</span>
    </div>

    <div class="flex gap-2">
      ${createLabels(data.labels)}
    </div>

    <p class="text-gray-600">
      ${data.description}
    </p>

    <div class="grid grid-cols-2 gap-4 pt-3">

      <div>
        <p class="text-sm text-gray-500">Assignee</p>
        <p class="font-semibold">${data.assignee}</p>
      </div>

      <div>
        <p class="text-sm text-gray-500">Priority</p>
        <span class="bg-gray-300 rounded-md px-6 ">${data.priority}</span>
      </div>

    </div>

  </div>
  `;

      document.getElementById("issue_modal").showModal();
    };

    loadIssues();
    //////////////////search input added
    document
      .getElementById("btn-search")
      .addEventListener("click", function () {
        // removeActive();
        const input = document.getElementById("input-search");
        const searchValue = input.value.trim().toLowerCase();
        console.log(searchValue);

        fetch(
          ` https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`,
        )
          .then((res) => res.json())
          .then((data) => {
            const issues = data.data;

            displayIssues(issues);
          });
      });

    /////////////////////////
  } else {
    modalTitle.innerText = "ERROR!!! ";
    modalDescription.innerText = "Signin failed";
    // alert("Signin Failed");
    document.getElementById("login-modal").showModal();
    return;
  }
});

// function signout() {
//   // dashboard hide
//   document.getElementById("main-section").classList.add("hidden");

//   // login show
//   document.getElementById("login-section").classList.remove("hidden");
// }
