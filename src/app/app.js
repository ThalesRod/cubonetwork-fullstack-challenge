'use strict';

const $ = document.querySelector.bind(document);

const url = 'http://localhost:3000/api/person';

const renderTable = (personsData) => {
  if (!personsData) return;

  const $tableContent = $('.Table-content');

  $tableContent.innerHTML = personsData.map(({ firstName, lastName, participation }, index) => {
    return `
    <tr>
      <td>${index + 1}</td>
      <td>${firstName}</td>
      <td>${lastName}</td>
      <td>${participation}%</td>
    </tr>
    `
  }).join('');
};

const sendPersonData = async () => {

  const $firstName      = $('#formFirstName');
  const $lastName       = $('#formLastName');
  const $participation  = $('#formParticipation');

  const formData = {
    firstName:      $firstName.value,
    lastName:       $lastName.value,
    participation:  $participation.value,
  };

  $firstName.value      = '';
  $lastName.value       = '';
  $participation.value  = '';

  return await axios.post(url, formData);
};

const app = async () => {
  const { data: personsData } = await axios.get(url);
  renderTable(personsData);
};

$('.Header-sendButton')
  .addEventListener('click', async (event) => {
    
    event.preventDefault();

    sendPersonData();
  
    const { data: personsData } = await axios.get(url);
    renderTable(personsData);
});

$('.Title-refreshButton')
  .addEventListener('click', app);

app();



