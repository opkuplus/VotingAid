import { Link } from 'react-router-dom'

const CandidateTableLinkItem = ({ pathname, data, textOne, textTwo }) => {
    return (
        <td style={{ cursor: "pointer" }}>
            <Link to={{ pathname: pathname, data: data }}>
                {textOne + ' ' + textTwo}
            </Link>
        </td>
    );
}

export default CandidateTableLinkItem;