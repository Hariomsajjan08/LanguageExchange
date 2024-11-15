// document.addEventListener("DOMContentLoaded", function () {
//     fetch('http://127.0.0.1:4000/getUsers/displyUsers')
//       .then(response => response.json())
//       .then(users => {
//         const container = document.getElementById('userCardsContainer');
  
//         users.forEach(user => {
//           const col = document.createElement('div');
//           col.className = 'col-md-4 mb-4';
  
//           const card = document.createElement('div');
//           card.className = 'card';
          
//           card.innerHTML = `
//             <div class="card-body">
//               <h5 class="card-title">${user.name}</h5>
//               <p class="card-text">Native Language: ${user.nativeLanguage}</p>
//               <p class="card-text">${user.summary}</p>
//               <button class="btn btn-primary" onclick="startChat('${user.username}')">Start Session</button>
//             </div>
//           `;
  
//           col.appendChild(card);
//           container.appendChild(col);
//         });
//       })
//       .catch(error => console.error('Error fetching users:', error));
//   });
  

//   function startChat(username) {
//     alert(`Starting chat session with ${username}...`);
//   }
  


document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem('authToken');


  if (!token) {
    window.location.href = './index.html';
    return;
  }

  fetch('http://127.0.0.1:4000/getUsers/displyUsers', {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` },
  })
    .then(response => response.json())
    .then(users => {
      const container = document.getElementById('userCardsContainer');
      container.innerHTML = '';

      users.forEach(user => {
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-4';

        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
          <div class="card-body">
            <h5 class="card-title">${user.name}</h5>
            <p class="card-text">Native Language: ${user.nativeLanguage}</p>
            <p class="card-text">${user.summary}</p>
            <button class="btn btn-primary" onclick="startChat('${user.username}')">Start Session</button>
          </div>
        `;

        col.appendChild(card);
        container.appendChild(col);
      });
    })
    .catch(error => {
      console.error('Error fetching users:', error);
      alert('Failed to load users. Please try again.');
    });
});


function startChat(username) {
  const token = localStorage.getItem('authToken');

 
  if (!token) {
    alert('Please log in to start a chat session.');
    window.location.href = './index.html';
    return;
  }

  alert(`Starting chat session with ${username}...`);
}


window.onpopstate = () => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    window.location.href = './index.html';
  }
};
