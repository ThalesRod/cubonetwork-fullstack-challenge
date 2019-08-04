'use strict';

import apiConfig from './service/apiConfig';

const $ = document.querySelector.bind(document);

const renderTable = (personsData) => {
  if (!personsData) return;

  $('.Table-content').innerHTML = personsData.map(({ firstName, lastName, participation }, index) => {
    // Formating each person data in table rows
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

  // Gettting form data
  const $firstName      = $('#formFirstName');
  const $lastName       = $('#formLastName');
  const $participation  = $('#formParticipation');

  const formData = {
    firstName:      $firstName.value,
    lastName:       $lastName.value,
    participation:  $participation.value,
  };

  // Cleaning form
  $firstName.value      = '';
  $lastName.value       = '';
  $participation.value  = '';

  // Send form data to API
  return await axios.post(apiConfig.path, formData);
};

const app = async () => {
  const { data: personsData } = await axios.get(apiConfig.path);
  renderTable(personsData);
};

$('.Header-sendButton')
  .addEventListener('click', async (event) => {
    
    event.preventDefault();

    sendPersonData();
  
    const { data: personsData } = await axios.get(apiConfig.path);
    renderTable(personsData);
});

$('.Title-refreshButton')
  .addEventListener('click', app);

app();



