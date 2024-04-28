import React, { ReactNode } from "react";

interface ModelInterface {
  children: ReactNode;
  styles?: string;
}

const Model: React.FC<ModelInterface> = (props) => {
  return (
    <div
      className={`absolute rounded-md right-1 h-fit w-fit ${props.styles && props.styles} `}
    >
      {props.children}
    </div>
  );
};

export default Model;
