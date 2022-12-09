let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

//Javascript

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}
const tabs = [{ url: "https://www.linkedin.com/in/per-harald-borgen/" }];

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `;
  }
  ulEl.innerHTML = listItems;
}

deleteBtn.addEventListener("dblclick", function () {
  // console.log("double clicked");
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
});

//Jquery
// $(document).ready(() => {
//   const $inputBtn = $("#input-btn");
//   const $inputEl = $("#input-el");
//   $inputBtn.on("click", () => {
//     var value = $inputEl.val();
//     myLeads.push(value);
//     $inputEl.val("");
//     renderLead();
//   });
//   const $ulEl = $("#ul-el");
//   function renderLead() {
//     let listItems = "";
//     myLeads.forEach(function (element, index) {
//       // var ul = $ulEl.text();
//       listItems += "<li>" + element + " " + "</li>";
//       listItems = `
//       <li>
//       <a href='${element}' target='_blank'>${element}</a>
//       </li>
//       `;
//       console.log(element);
//     });
//     $ulEl.html(listItems);
//   }
// });
