import React, {CSSProperties} from 'react';

import './Card.css';

type Props = {
  className?: string,
  style?: CSSProperties | undefined,
  children: React.ReactNode
}

const Card: React.FC<Props> = (props: any) => {
  return (
    <div className={`card ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default Card;
