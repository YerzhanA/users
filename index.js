// Создать массив пользователей созданных на
// основе класса User(fullname, age)


class User {
    id;
    firstName;
    lastName;
    maidenName;
    age;
    gender;
    email;
    parent;
    phone;
    constructor(id, firstName, lastName, maidenName, age, gender, email, phone, parentSelector) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.maidenName = maidenName;
        this.age = age;
        this.gender = gender;
        this.email = email;
        this.parent = document.querySelector(parentSelector);
        this.phone = phone;
    }

    getInfo() {
        console.log("firstName " + this.firstName + " lastName " + this.lastName + " age " + this.age);
    }
    render() {
        const element = document.createElement("div");
        element.innerHTML = `
      <div class="item" id="${this.id}">
          <div class="item-name">
              <div class="first-name right">${this.firstName}</div>
              <div class="last-name right">${this.lastName}</div>
              <div class="maiden-name">${this.maidenName}</div>
          </div>
          <div class="flex">
              <p class="right">age:</p>
              <p>${this.age}</p>
          </div>
          <div class="flex">
              <p class="right">gender:</p>
              <p>${this.gender}</p>
          </div>
          <div class="flex">
              <p class="right">email:</p>
              <p>${this.email}</p>
          </div>
          <div class="flex">
              <p class="right">phone:</p>
              <p>${this.phone}</p>
          </div>
      </div>
      `;
        this.parent.append(element);
    }
}

const btn = document.querySelector('.btn');
btn.addEventListener('click', showUsers)
console.log(btn);
function showUsers() {
    const empty = document.querySelector('.empty');
    empty.remove()
    getUsers()
}

async function getUsers() {
    let response = await fetch('https://quantico.kz:3003');

    if (response.ok) { // если HTTP-статус в диапазоне 200-299
        // получаем тело ответа 
        let data = await response.json();

        data.users.forEach(element => {
            new User(element.id, element.firstName, element.lastName, element.maidenName, element.age,
                element.gender, element.email, element.phone, '.items').render()
        });

    } else {
        alert("Ошибка HTTP: " + response.status);
    }

}
