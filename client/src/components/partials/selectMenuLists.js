const QuestionAreaList = {
    universal: 'Select filter',
    ask: 'ASK',
    helga: 'Helga',
    humako: 'HUMAKO',
    jamko: 'JAMKO',
    laureamko: 'Laureamko',
    metka: 'METKA',
    odiako: "O'Diako",
    tuo: 'TUO',
};

const StudentAssociations = Object.assign({}, QuestionAreaList);
delete StudentAssociations.universal;



export {
    QuestionAreaList,
    StudentAssociations,
}