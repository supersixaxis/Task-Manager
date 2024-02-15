import axios from 'axios'

const url_get_tables = "https://firestore.googleapis.com/v1/projects/" + import.meta.env.VITE_PROJECT_ID + "/databases/(default)/documents/table?key=" + import.meta.env.VITE_API_KEY

export function getTables(){

    try{

        return axios.get(url_get_tables)
        .then(function(response){
            let tablesFirebase = response.data.documents
            let tables = []

            for(let tb of tablesFirebase){
                let table = {
                    id: tb.name.split('/table/')[1],
                    title: tb.fields.title?.stringValue,
                    order: tb.fields.order?.stringValue,
                    spaceId: tb.fields.spaceId?.stringValue,
                    color: tb.fields.color?.stringValue,
                }
                tables.push(table)
            }
            return tables
        })

    } catch(e){
        console.error(e)
    }

}
