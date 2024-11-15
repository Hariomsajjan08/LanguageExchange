
// async function loadUserProfile() {
//     const token = localStorage.getItem('authToken');
  
//     const response = await fetch('http://127.0.0.1:4000/profile/getUser', {
//       method: 'GET',
//       headers: { 'Authorization': `Bearer ${token}` },
//     });
  
//     const userData = await response.json();
//     if (response.ok) {
//       document.getElementById('name').value = userData.name;
//       document.getElementById('email').value = userData.emailId;
//       document.getElementById('nativeLanguage').value = userData.nativeLanguage;
//       document.getElementById('summary').value = userData.summary;
//     } else {
//       alert(userData.message);
//     }
//   }
  

//   async function updateUserProfile(event) {
//     event.preventDefault();
  
//     const token = localStorage.getItem('authToken');
//     const name = document.getElementById('name').value;
//     const country = document.getElementById('country').value;
//     const nativeLanguage = document.getElementById('nativeLanguage').value;
//     const summary = document.getElementById('summary').value;
  
//     const response = await fetch('http://127.0.0.1:4000/profile/updateUser', {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       },
//       body: JSON.stringify({ name, country, nativeLanguage, summary })
//     });
  
//     const result = await response.json();
  
//     if (response.ok) {
//       alert('Profile updated successfully');
//     } else {
//       alert(result.message || 'An error occurred while updating your profile');
//     }
//   }
  
  
//   function logout() {
//     localStorage.removeItem('authToken');
//     window.location.href = './index.html';
//   }
  
  
//   function goToHome() {
//     window.location.href = './Home.html';
//   }
  
//   window.onload = loadUserProfile;
  


async function loadUserProfile() {
  const token = localStorage.getItem('authToken');


  if (!token) {
    window.location.href = './index.html';
    return;
  }

  try {
    const response = await fetch('http://127.0.0.1:4000/profile/getUser', {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` },
    });

    const userData = await response.json();
    if (response.ok) {
      document.getElementById('name').value = userData.name;
      document.getElementById('email').value = userData.emailId;
      document.getElementById('nativeLanguage').value = userData.nativeLanguage;
      document.getElementById('summary').value = userData.summary;
    } else {
      alert(userData.message);
      logout();
    }
  } catch (error) {
    console.error('Error loading profile:', error);
    alert('Failed to load user profile');
  }
}


async function updateUserProfile(event) {
  event.preventDefault();

  const token = localStorage.getItem('authToken');
  const name = document.getElementById('name').value;
  const country = document.getElementById('country').value;
  const nativeLanguage = document.getElementById('nativeLanguage').value;
  const summary = document.getElementById('summary').value;

  if (!token) {
    window.location.href = './index.html';
    return;
  }

  try {
    const response = await fetch('http://127.0.0.1:4000/profile/updateUser', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name, country, nativeLanguage, summary })
    });

    const result = await response.json();

    if (response.ok) {
      alert('Profile updated successfully');
    } else {
      alert(result.message || 'An error occurred while updating your profile');
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    alert('Failed to update profile');
  }
}


function logout() {
  localStorage.removeItem('authToken');
  window.location.href = './index.html';


  history.replaceState(null, '', './index.html');
}

// Redirect to home page if authenticated
function goToHome() {
  const token = localStorage.getItem('authToken');
  if (!token) {
    window.location.href = './index.html';
    return;
  }
  window.location.href = './Home.html';
}


window.onload = () => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    window.location.href = './index.html';
  } else {
    loadUserProfile();
  }
};


window.onpopstate = () => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    window.location.href = './index.html';
  }
};
