const incidencesDB = new PouchDB('incidences');
const saveIncidence = (incidence) => {
    incidence._id = new Date().toISOString();
    return incidencesDB.put(incidence).then((result) => {
        self.registration.sync.register('incidence-post');
        const response = {
            registered: true,
            offline: true
        };
        return new Response(JSON.stringify(response));
    })
        .catch((err) => {
            console.log(err);

        })

};
const savePostIncidence = () => {
    const incidences = [];
    return incidences.allDocs({ include_docs: true }).then((docs) => {
        const { rows } = docs;
        for (const row of rows) {
            const { doc } = row;
            const response = axiosClient.post('/incidences/save')
                .then((res) => {
                    return incidencesDB.remove(doc);
                }).catch(console.log);
            incidences.push(response);

        }
        return Promise.all(incidences);
    })

}