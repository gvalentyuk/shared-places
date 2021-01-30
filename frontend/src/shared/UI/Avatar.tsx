import React, { CSSProperties } from 'react';

import './Avatar.css';

type Props = {
  className?: string,
  style?: CSSProperties | undefined,
  image: string,
  alt: string,
  width?: string,
  height? :string
}

const Avatar: React.FC<Props> = props => {
  return (
    <div className={`avatar ${props.className}`} style={props.style}>
      <img
        src={props.image}
        alt={props.alt}
        style={{ width: props.width, height: props.width }}
      />
    </div>
  );
};

export default Avatar;
