
if (
  localStorage.getItem("color-theme") === "dark" ||
  (!("color-theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

window.addEventListener("load", function (e) {
  let keys = Object.keys(localStorage);
  for (let key of keys) {
    if (key !== "color-theme")
    taskwrapper.innerHTML += createTask(JSON.parse(localStorage.getItem(key)));
  }
  recalculateNumbers();
});

addTaskButton.onclick = function (e) {
  e.preventDefault();
  const taskObj = {
    id: "task#" + Math.floor(Math.random() * 100000000),
    title: taskTitle.value.trim(),
    desc: taskDesc.value.trim(),
    date: new Date().toLocaleString(),
    done: false,
  };

  if (taskObj.title == "") return;
  taskwrapper.innerHTML += createTask(taskObj);
  localStorage.setItem(taskObj.id, JSON.stringify(taskObj));
  taskTitle.value = "";
  taskDesc.value = "";
  recalculateNumbers();
};

function deleteTask(taskId) {
  deleteModal.classList.remove("hidden");
  confirmbutton.onclick = function () {
    localStorage.removeItem(taskId);
    document.getElementById(taskId).remove();
    deleteModal.classList.add("hidden");
    recalculateNumbers();
  };
}
function taskCompleted(taskId) {
  let item = JSON.parse(localStorage.getItem(taskId));
  item.done = true;
  localStorage.setItem(taskId, JSON.stringify(item));

  document.getElementById(taskId).classList.remove("shadow-2xl");
  document.getElementById(taskId).getElementsByTagName("button")[1].remove();
  document
    .getElementById(taskId)
    .childNodes[1].insertAdjacentHTML(
      "afterbegin",
      '<p class="px-2 p-1 rounded bg-green-100 w-fit  text-green-500">Completed!</p>'
    );
  recalculateNumbers();
}
function createTask(taskObj) {
  return `<li
    id="${taskObj.id}"
    class="flex flex-row w-full ${
      taskObj.done === true ? "" : "shadow-2xl"
    }  shadow-slate-300  bg-slate-50 dark:bg-slate-800 dark:border-slate-600  items-stretch justify-between p-4 rounded-lg hover:outline-sky-300 light:hover:outline"
  >
    <div class="h-full flex flex-col justify-between max-w-2xl gap-1">
    ${
      taskObj.done === true
        ? `<p class="px-2 p-1 mb-4 rounded bg-green-100  w-fit  text-green-500">Completed!</p>`
        : ""
    }
      <h2 class="text-lg font-medium text-sky-500">${taskObj.title}</h2>
      <p class="font-light text-slate-700 dark:text-slate-300">
      ${taskObj.desc}
      </p>
      <p class="text-sm text-slate-500">${taskObj.date}</p>
    </div>
    <div class=" flex flex-col gap-2 items-center justify-between">
      <button
      onclick="deleteTask('${taskObj.id}')"
        class="px-4 p-2 rounded bg-white dark:bg-slate-500 text-slate-500 dark:text-white hover:text-red-500"
      >
        <i class="text-xl fa-solid fa-trash"></i>
      </button>
      ${
        taskObj.done === false
          ? `<button

        onclick="taskCompleted('${taskObj.id}')"
  
          class="px-4 p-2 rounded dark:bg-slate-500 dark:text-white bg-white text-slate-500 hover:text-green-500"
        >
          <i class="text-xl fa-solid fa-circle-check"></i>
        </button>`
          : ""
      }

      
    </div>
  </li>`;
}

function search() {
  let li = taskwrapper.getElementsByTagName("li");
  for (let i = 0; i < li.length; i++) {
    let txtValue = li[i].textContent || li[i].innerText;
    if (txtValue.toLowerCase().indexOf(searchbox.value.toLowerCase()) > -1) {
      li[i].classList.remove("hidden");
    } else {
      li[i].classList.add("hidden");
    }
  }
}

const closeModal = () => {
  deleteModal.classList.add("hidden");
};

const recalculateNumbers = () => {
  let keys = Object.keys(localStorage);
  tasksnumber.innerHTML = keys.length-1;
  let doneNumber = 0;
  for (let key of keys) {
    if (key !== "color-theme" && JSON.parse(localStorage.getItem(key)).done === true) {
      doneNumber++;
    }
  }
  donenumber.innerHTML = doneNumber;
  activenumber.innerHTML = keys.length - doneNumber -1;
};

themeButton.onclick = function () {
  if (localStorage.getItem("color-theme")) {
    if (localStorage.getItem("color-theme") === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    }

    // if NOT set via local storage previously
  } else {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    }
  }
};
