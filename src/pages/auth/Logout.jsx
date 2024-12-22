import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ApiRouter } from '../../utils/Api';
import { API_ENDPOINTS } from '../../utils/Mapping';

export default function Logout({ setAccessChange, accessChange}) {
    const navigate = useNavigate();

    useEffect(() => {
        ApiRouter.get(API_ENDPOINTS.LOGOUT())
        .then(data => {
            if (data.success == true) {
                setAccessChange(!accessChange);
                navigate('/');
            }
            else 
                console.log('Logout failed.'); // Should never happen
        });
        navigate('/');
    }, []);

    return (
        <>Please contact the site administrator with a screenshot of this page.</>
    );
}