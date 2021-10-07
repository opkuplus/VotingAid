import CandidateTableItemRow from './candidateTableRow'
import CandidateTableHeader from './candidateTableHeader'
import Table from 'react-bootstrap/Table';
import { UserContext } from "../../context/userContext";
import language from "../../properties/language";
import React, { useContext } from 'react';

const CandidateTable = ({ stateArray, counter, candidateDeleted }) => {
    console.log(stateArray)
    const context = useContext(UserContext);
    return (
        <Table striped bordered hover variant="light">
            <thead>
                <tr>
                    <CandidateTableHeader header={language.candidateHolder[context.language]} />
                    <CandidateTableHeader header={language.studentAssociationHolder[context.language]} />
                    <CandidateTableHeader header={language.deleteHolder[context.language]} />
                </tr>
            </thead>
            <tbody>
                {stateArray.amount.map(index => {
                    counter++;
                    return (
                        <CandidateTableItemRow key={index} id="candidate"
                            candidateDeleted={candidateDeleted}
                            text={stateArray['Candidate' + counter].studentAssociation}
                            textOne={stateArray['Candidate' + counter].name}
                            textTwo={stateArray['Candidate' + counter].surname}
                            data={stateArray['Candidate' + counter].email}
                        />
                    );
                })}
            </tbody>
        </Table>
    );
}

export default CandidateTable;