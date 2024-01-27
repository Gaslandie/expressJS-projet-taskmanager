/* eslint-disable no-undef */
/* eslint-disable max-len */
const tasksDOM = document.querySelector('.tasks'); // ou seront nos taches
const loadingDOM = document.querySelector('.loading-text');// en attendant que nos taches s'affiche
const formDOM = document.querySelector('.task-form');// formulaire de tache
const taskInputDOM = document.querySelector('.task-input');// input tache
const formAlertDOM = document.querySelector('.form-alert'); // afficher si c'est ok pour notre operation,ajout,suppression...


// chargement de nos taches depuis api/v1/tasks
const showTasks = async () => {
  loadingDOM.style.visibility = 'visible'; // chargement en cours
  try {
    // eslint-disable-next-line no-undef
    const {data: {tasks}} = await axios.
    get('https://us-central1-gestionnaire-de-tache-7deac.cloudfunctions.net/app/api/v1/tasks'); // recuperation de notre backend
    if (tasks.length < 1) { // si pas de tache,afficher 'aucune tache'
      tasksDOM.innerHTML = '<h5 class="empty-list">Aucune tâche pour le moment</h5>';
      loadingDOM.style.visibility = 'hidden'; // pas besoin du message chargement en cours
      return;
    }
    const allTasks = tasks
        .map((task) => { // pour chaque task
          const {completed, _id: taskID, name} = task; // destructuration
          return `<div class="single-task ${completed && 'task-completed'}">
<h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
<div class="task-links">



<!-- edit link -->
<a href="task.html?id=${taskID}"  class="edit-link">
<i class="fas fa-edit"></i>
</a>
<!-- delete btn -->
<button type="button" class="delete-btn" data-id="${taskID}">
<i class="fas fa-trash"></i>
</button>
</div>
</div>`;
        })
        .join('');// pour transformer notre tableau de chaine de caractère en un element injectable dans le dom
    tasksDOM.innerHTML = allTasks;
  } catch (error) {
    tasksDOM.innerHTML =
      '<h5 class="empty-list">Il ya eu une erreur,merci de reessayer plus tard...</h5>';
  }
  loadingDOM.style.visibility = 'hidden';
};

showTasks(); // afficher les taches au chargement

// delete task /api/tasks/:id

tasksDOM.addEventListener('click', async (e) => {
  const el = e.target; // on recupere l'element cliqué
  if (el.parentElement.classList.contains('delete-btn')) { // si on a cliqué sur le bouton supprimer?
    loadingDOM.style.visibility = 'visible'; // en attendant le retour de la mise à jour on affiche chargement en cours
    const id = el.parentElement.dataset.id; // recuperation de notre id pour loperation backend
    try {
      await axios.delete(`https://us-central1-gestionnaire-de-tache-7deac.cloudfunctions.net/app/api/v1/tasks/${id}`); // on attend de supprimer la tache
      showTasks();// pour afficher les taches restantes ou pas
    } catch (error) {
      console.log(error);
    }
  }
  loadingDOM.style.visibility = 'hidden';
});

// pour notre formulaire

formDOM.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = taskInputDOM.value; // name car on a decidé de donner ce nom à notre tache au niveau du backend

  try {
    await axios.post('https://us-central1-gestionnaire-de-tache-7deac.cloudfunctions.net/app/api/v1/tasks', {name});
    showTasks();// on attend d'envoyer notre nouvelle tache dans la base de donnée pour afficher la mise à jour
    taskInputDOM.value = '';// on reinitialise le contenu de notre input
    formAlertDOM.style.display = 'block';
    formAlertDOM.textContent = `tâche ajoutée avec succès`;// pour dire que la tache a  bien été ajoutée
    formAlertDOM.classList.add('text-success'); // si ok,on ajoute la classe text-success pour le style
  } catch (error) {
    formAlertDOM.style.display = 'block';
    formAlertDOM.innerHTML = `erreur,merci de reessayer`; // sil ya erreur
  }
  setTimeout(() => {// après 3 secondes retirer le message
    formAlertDOM.style.display = 'none';
    formAlertDOM.classList.remove('text-success');
  }, 3000);
});
