import axios from 'axios'

const url_get_tasks = "https://firestore.googleapis.com/v1/projects/" + import.meta.env.VITE_PROJECT_ID + "/databases/(default)/documents/task?key=" + import.meta.env.VITE_API_KEY

export function getTasks(){

    try{

        return axios.get(url_get_tasks)
        .then(function(response){
            let tasksFirebase = response.data.documents
            let tasks = []

            for(let ts of tasksFirebase){
        
                let task = {
                    id: ts.name.split('/task/')[1],
                    title: ts.fields.title?.stringValue,
                    tableId: ts.fields.tableId?.stringValue,
                    color: ts.fields.color?.stringValue,
                }
                tasks.push(task)
            }
            return tasks
        })

    } catch(e){
        console.error(e)
    }

}

const url_add_task = "https://firestore.googleapis.com/v1/projects/" + import.meta.env.VITE_PROJECT_ID + "/databases/(default)/documents/task?key=" + import.meta.env.VITE_API_KEY

export function addTaskAPI(title, tableId, color){

    try{

        return axios.post(
            url_add_task,
            {
                "fields": {
                  "title": {
                    "stringValue": title
                  },
                  "tableId": {
                    "stringValue": tableId
                  },
                  "color": {
                    "stringValue": color
                  }
                }
              }
        )
        .then(function(response){
            return response.data.name.split("/task/")[1]
        })

    } catch(e){
        console.error(e)
    }

}

export function updateTaskAPI(id, title, tableId, color){

    const url_update_task = "https://firestore.googleapis.com/v1/projects/" + import.meta.env.VITE_PROJECT_ID + "/databases/(default)/documents/task/" + id + "?key=" + import.meta.env.VITE_API_KEY

    try{
    //   console.log('ID de la task :', id);
    //   console.log('Titre :', title);
    //   console.log('ID de la table :', tableId);
    //   console.log('Couleur :', color);
        return axios.patch(
            url_update_task,
            {
                "fields": {
                  "title": {
                    "stringValue": title
                  },
                  "tableId": {
                    "stringValue": tableId
                  },
                  "color": {
                    "stringValue": color
                  }
                }
              }
        )
        
        .then(function(response){
            console.log(response)
        })

    } catch(e){
        console.error(e)

    }

}

export function deleteTaskAPI(id){

    const url_delete_task = "https://firestore.googleapis.com/v1/projects/" + import.meta.env.VITE_PROJECT_ID + "/databases/(default)/documents/task/" + id + "?key=" + import.meta.env.VITE_API_KEY

    try{

        return axios.delete(
            url_delete_task
        )
        .then(function(response){
            console.log(response)
        })

    } catch(e){
        console.error(e)
    }

}