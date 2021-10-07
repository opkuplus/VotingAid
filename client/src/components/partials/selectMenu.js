
import React from 'react';
import StudentAssociationOption from './studentAssociationOption';


const SelectMenu = ({ className, action, selectMenuList }) => {
    return (
        <select className={className} onChange={action}>
            {Object.values(selectMenuList).map(item => {
                return <StudentAssociationOption key={item} value={item} text={item} />
            })}
        </select>
    );
}

export default SelectMenu;