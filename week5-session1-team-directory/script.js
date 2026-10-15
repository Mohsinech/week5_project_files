const loader = document.querySelector("#loader");
const message = document.querySelector("#message");
const userList = document.querySelector("#user-list");
const reloadBtn = document.querySelector("#reload-btn");

const API_URL = "https://jsonplaceholder.typicode.com/users";

function toUiModel(users) {
  return users.map((user) => ({
    id: user.id,
    name: user.name,
    city: user.address.city,
    company: user.company.name,
  }));
}

function render(people) {
  userList.textContent = "";
  for (let i = 0; i < people.length; i++) {
    const card = document.createElement("article");
    card.classList.add("card");
    card.textContent = `${people[i].name} - ${people[i].city} (${people[i].company})`;
    userList.appendChild(card);
  }
}

async function loadUsers() {
  loader.hidden = false;
  message.textContent = "";
  userList.textContent = "";

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const users = await response.json();
    const people = toUiModel(users);

    if (people.length === 0) {
      message.textContent = "No users found.";
    } else {
      render(people);
    }
  } catch (error) {
    message.textContent = "Something went wrong. Please try again.";
    console.log(error);
  } finally {
    loader.hidden = true;
  }
}

reloadBtn.addEventListener("click", loadUsers);
loadUsers();
