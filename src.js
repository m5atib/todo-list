window.addEventListener("load", function (e) {
  let keys = Object.keys(localStorage);
  for (let key of keys) {
    taskwrapper.innerHTML += createTask(JSON.parse(localStorage.getItem(key)));
  }
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
};

function deleteTask(taskId) {
  deleteModal.classList.remove("hidden");
  confirmbutton.onclick = function () {
    localStorage.removeItem(taskId);
    document.getElementById(taskId).remove();
    deleteModal.classList.add("hidden");
  };
}
function taskCompleted(taskId) {
  let item = JSON.parse(localStorage.getItem(taskId));
  item.done = true;
  localStorage.setItem(taskId, JSON.stringify(item));
  
  document.getElementById(taskId).classList.remove("shadow-2xl")
  document.getElementById(taskId).getElementsByTagName("button")[1].remove();
  document
    .getElementById(taskId)
    .childNodes[1].insertAdjacentHTML(
      "afterbegin",
      '<p class="px-2 p-1 rounded bg-green-100 w-fit  text-green-500">Completed!</p>'
    );
}
function createTask(taskObj) {
  return `<li
    id="${taskObj.id}"
    class="flex flex-row w-full ${
      taskObj.done === true ? "" : "shadow-2xl"
    }  shadow-slate-300  bg-slate-50  items-stretch justify-between p-4 rounded-lg hover:outline-sky-300 hover:outline"
  >
    <div class="h-full flex flex-col justify-between max-w-2xl gap-1">
    ${
      taskObj.done === true
        ? `<p class="px-2 p-1 mb-4 rounded bg-green-100  w-fit  text-green-500">Completed!</p>`
        : ""
    }
      <h2 class="text-md font-medium text-sky-500">${taskObj.title}</h2>
      <p class="font-light text-slate-700">
      ${taskObj.desc}
      </p>
      <p class="text-sm text-slate-500">${taskObj.date}</p>
    </div>
    <div class=" flex flex-col gap-2 items-center justify-between">
      <button
      onclick="deleteTask('${taskObj.id}')"
        class="px-4 p-2 rounded bg-white text-slate-500 hover:text-red-500"
      >
        <i class="text-xl fa-solid fa-trash"></i>
      </button>
      ${
        taskObj.done === false
          ? `<button

        onclick="taskCompleted('${taskObj.id}')"
  
          class="px-4 p-2 rounded bg-white text-slate-500 hover:text-green-500"
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
