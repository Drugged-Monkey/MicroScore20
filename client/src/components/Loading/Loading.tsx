import * as React from "react";

import cssExports from './Loading.scss';

interface ILoadingProps {
    visible: boolean;
}


const Loading = (props?: ILoadingProps) => {
    const loadingElement = props.visible ? <div className={cssExports.loading}>LOADING</div> : null;

    return (
        loadingElement
    );
}

export default Loading;
