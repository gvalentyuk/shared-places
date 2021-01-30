import React from 'react';

import './MainHeader.css';

const MainHeader: React.FC<React.ReactNode> = (props) => {
    return (
        <header className="main-header">{props.children}</header>
    )
}

export default MainHeader;