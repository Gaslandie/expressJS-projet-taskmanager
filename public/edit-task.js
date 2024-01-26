const taskIDDOM = document.querySelector('.task-edit-id') //l'id de notre tache
const taskNameDOM = document.querySelector('.task-edit-name') //notre tache
const taskCompletedDOM = document.querySelector('.task-edit-completed') //lelement cochable
const editFormDOM = document.querySelector('.single-task-form')//formulaire de modification de tache
const editBtnDOM = document.querySelector('.task-edit-btn')//notre button
const formAlertDOM = document.querySelector('.form-alert') //afficher si c'est ok pour notre operation,ajout,suppression...
const params = window.location.search //pour recuperer la partie de notre url à partir du premier point d'interrogation
const id = new URLSearchParams(params).get('id') //pour extraire notre id
let tempName

const showTask = async () => {
  try {
    const {data: { task }} = await axios.get(`/api/v1/tasks/${id}`)//on recupere notre tache avec l'id
    const { _id: taskID, completed, name } = task //destructuration

    taskIDDOM.textContent = taskID //l'id de notre tache dans lelement taskIddom
    taskNameDOM.value = name
    tempName = name
    if (completed) {
      taskCompletedDOM.checked = true //si la tache est complétée,terminée,on met la valeur du checked à true
    }
  } catch (error) {
    console.log(error)
  }
}

showTask()

//formulaire d'edition de la tache
editFormDOM.addEventListener('submit', async (e) => { 
  editBtnDOM.textContent = 'Loading...'
  e.preventDefault()
  try {
    const taskName = taskNameDOM.value 
    const taskCompleted = taskCompletedDOM.checked 

    const {data: { task }} = await axios.patch(`/api/v1/tasks/${id}`, {//modifier notre tache
      name: taskName,
      completed: taskCompleted,
    })

    const { _id: taskID, completed, name } = task

    taskIDDOM.textContent = taskID
    taskNameDOM.value = name
    tempName = name
    if (completed) {
      taskCompletedDOM.checked = true
    }
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `tâche modifiée avec succès`
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    console.error(error)
    taskNameDOM.value = tempName
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `Erreur,merci de reessayer`
  }
  editBtnDOM.textContent = 'Modifier'
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})
