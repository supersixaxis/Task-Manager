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