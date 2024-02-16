import axios from "axios";

const url_get_spaces = "https://firestore.googleapis.com/v1/projects/" + import.meta.env.VITE_PROJECT_ID + "/databases/(default)/documents/space?key=" + import.meta.env.VITE_API_KEY

export function getSpaces(){

    try{
        return axios.get(url_get_spaces)
        .then(function(response){
            let spacesFirebase = response.data.documents
            let spaces = []
          
            for(let sp of spacesFirebase){
            
                let space = {
                    id: sp.name.split('/space/')[1],
                    title: sp.fields.title?.stringValue,
                    color: sp.fields.color?.stringValue,
                }
                spaces.push(space)
            }
            return spaces
        })

    } catch(e){
        console.error(e)
    }

}

const url_add_spaces = "https://firestore.googleapis.com/v1/projects/" + import.meta.env.VITE_PROJECT_ID + "/databases/(default)/documents/space?key=" + import.meta.env.VITE_API_KEY

export function addSpacesAPI(title, color){

    try{

        return axios.post(
            url_add_spaces,
            {
                "fields": {
                  "title": {
                    "stringValue": title
                  },
                  "color": {
                    "stringValue": color
                  }
                }
              }
        )
        .then(function(response){
            return response.data.name.split("/space/")[1]
        })

    } catch(e){
        console.error(e)
    }

}

export function deleteSpacesAPI(id){

    const url_delete_space = "https://firestore.googleapis.com/v1/projects/" + import.meta.env.VITE_PROJECT_ID + "/databases/(default)/documents/space/" + id + "?key=" + import.meta.env.VITE_API_KEY

    try{

        return axios.delete(
            url_delete_space
        )
        .then(function(response){
            console.log(response)
        })

    } catch(e){
        console.error(e)
    }

}

export function updateSpacesAPI(id, title, color){

    const url_update_space = "https://firestore.googleapis.com/v1/projects/" + import.meta.env.VITE_PROJECT_ID + "/databases/(default)/documents/space/" + id + "?key=" + import.meta.env.VITE_API_KEY

    try{

        return axios.patch(
            url_update_space,
            {
                "fields": {
                  "title": {
                    "stringValue": title
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