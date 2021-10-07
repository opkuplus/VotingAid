import Axios from 'axios';
import { endpoint } from '../api';

const FilterCandidateTable = (setStateArray, filter) => {
    Axios.post(endpoint.filteredCandidates, { data: filter })
        .then(res => {
            console.log(res)
            let q = [];
            for (var i = 0; i < res.data.length; i++) {
                setStateArray(['Candidate' + i], res.data[i])
                q.push(res.data[i].name);
                setStateArray('amount', q);
            }
        })
}

// const SetCandidateTable = (setStateArray) => {
//     Axios.get(endpoint)
//         .then(res => {
//             let q = [];
//             let s = [];
//             for (var i = 0; i < res.data.length; i++) {
//                 setStateArray(['Candidate' + i], res.data[i])
//                 q.push(res.data[i].name);
//                 setStateArray('amount', q);
//                 s.push(res.data[i].studentAssociation);

//             }
//             const uniqueAssociations = Array.from(new Set(s));
//             setStateArray('Association', uniqueAssociations);
//         });
// }

export {
    // SetCandidateTable,
    FilterCandidateTable,
};