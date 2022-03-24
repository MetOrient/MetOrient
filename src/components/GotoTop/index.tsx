import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GotoTop = () => {
    const routePath = useLocation();
    const onTop = () => {
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        onTop();
    }, [routePath]);

    return null;
};

export default GotoTop;
