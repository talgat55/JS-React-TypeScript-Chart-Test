import React, {FC, ReactNode, memo} from 'react';

interface IProps {
    children: ReactNode;
}

const BaseLayout: FC<IProps> = ({children}) => {
    return (
        <div className="main-wrapper">
           <div className="main">
               {children}
           </div>
        </div>
    )
}

export default memo(BaseLayout)