import React from 'react';
import { BeatLoader } from 'react-spinners';

const AppLoadingView = () => {
    return(
        <div className="tooSmallView">
            <BeatLoader loading color={"#17BB0F"} />
        </div>
    );
}
export default AppLoadingView;
