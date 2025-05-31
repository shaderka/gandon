"use client"
import React, {useState} from 'react';
import "../../app/styles/products/filtercontainer.scss"
const FilterContainer = () => {
    const [items, setItems] = useState([]);
    const [selectedCatId, setSelectedCatId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [showFilters, setShowFilters] = useState(true); // Для мобильной версии

    const fetchItems = async (catId) => {
        setLoading(true);
        setSelectedCatId(catId);
        try {
            const res = await fetch('/api/getItemsFromCategory', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ catId, priceRange }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Ошибка загрузки');
            setItems(data.items);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="filter-container">
            {/* Сайдбар фильтров */}
            <div className="filter-sidebar">
                <h3>Фильтры</h3>

                {/* Категории */}
                <div className="category-section">
                    <h4>Категории</h4>
                    <ul>
                        {[1, 2, 3, 4, 5].map((catId) => (
                            <li
                                key={catId}
                                className={selectedCatId === catId ? 'selected' : ''}
                                onClick={() => fetchItems(catId)}
                            >
                                <span style={{ marginRight: '10px' }}>
                                    {catId === 1 ? '👕' :
                                        catId === 2 ? '👟' :
                                            catId === 3 ? '⌚' :
                                                catId === 4 ? '👜' : '👓'}
                                </span>
                                {catId === 1 ? 'Одежда' :
                                    catId === 2 ? 'Обувь' :
                                        catId === 3 ? 'Часы' :
                                            catId === 4 ? 'Сумки' : 'Аксессуары'}
                                {selectedCatId === catId && (
                                    <span className="checkmark">✓</span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Фильтр по цене */}
                <div className="price-filter">
                    <h4>Цена, ₽</h4>
                    <div className="price-inputs">
                        <input
                            type="number"
                            value={priceRange[0]}
                            onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                        />
                        <span>-</span>
                        <input
                            type="number"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                        />
                    </div>
                    <button onClick={() => fetchItems(selectedCatId)}>
                        Применить фильтры
                    </button>
                </div>
            </div>

            {/* Основной контент */}
            <div className="main-content">
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="loading-container">
                        <div>Загрузка товаров...</div>
                    </div>
                ) : items.length > 0 ? (
                    <div className="products-grid">
                        {items.map(item => (
                            <div key={item._id} className="product-card">
                                <h3>{item.title}</h3>
                                {item.price && (
                                    <div className="price">
                                        {item.price.toLocaleString()} ₽
                                    </div>
                                )}
                                {item.imagesUrl?.[0] && (
                                    <img
                                        src={item.imagesUrl[0]}
                                        alt={item.title}
                                    />
                                )}
                                <div className="article">
                                    Артикул: {item.articleNumber}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        Выберите категорию для отображения товаров
                    </div>
                )}
            </div>
        </div>
    );
};

export default FilterContainer;