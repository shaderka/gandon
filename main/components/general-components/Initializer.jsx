'use client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '@/app/store/slices/userInfo';

const AppInitializer = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            dispatch(setUser(JSON.parse(userData)));
        }
    }, []);

    return null;
};

export default AppInitializer;
