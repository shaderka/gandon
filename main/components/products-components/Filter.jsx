"use client"
import React, {useEffect, useState} from 'react';
import "../../app/styles/products/filter.scss"
const Filter = ({ catId }) => {
    const [subcategories, setSubcategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSubcategories = async () => {
            setLoading(true);
            setError('');
            try {
                const res = await fetch('/api/categories', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ catId }),
                });

                if (!res.ok) {
                    const err = await res.json();
                    throw new Error(err.error || 'Ошибка при загрузке категорий');
                }

                const data = await res.json();
                const reversedData = data.reverse()
                setSubcategories(reversedData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (catId) {
            fetchSubcategories();
        }
    }, [catId]);

    return (
        <div className="filter-container">
            <h3>Подкатегории категории ID {catId}</h3>
            {loading && <p>Загрузка...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

                {subcategories.map((cat) => (
                    <button key={cat.id} className="cat-button">{cat.name} (Уровень {cat.level})</button>
                ))}

        </div>
    );
};

export default Filter;