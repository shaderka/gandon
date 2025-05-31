import React, {useEffect, useState} from 'react';
import "../../app/styles/userprofile/userdata.scss"


const UserData = () => {
    const [userData, setUserData] = useState({
        name: "",
        surname: "",
        middlename: "",
        town: "",
        street: "",
        house: "",
        apartment: "",
        phoneNumber: "",
        birthdate: ""
    });

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Загрузка данных при монтировании
    useEffect(() => {
        const loadUserData = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user?.email) {
                try {
                    const response = await fetch('/api/getUserData', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: user.email })
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setUserData(prev => ({
                            ...prev,
                            ...data.userdata

                        }));
                    }
                } catch (error) {
                    console.error('Ошибка загрузки данных:', error);
                }
            }
        };

        loadUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    const DataSave = async () => {
        setIsLoading(true);
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user?.email) throw new Error('Пользователь не авторизован');
            console.log('Отправка данных:', {
                email: user.email,
                ...userData
            });
            console

            const response = await fetch('/api/saveUserData', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: user.email,
                    ...userData,

                })
            });

            const result = await response.json();

            if (!response.ok) throw new Error(result.message || 'Ошибка сохранения');

            setMessage('Данные сохранены успешно!');

            // Обновляем localStorage
            localStorage.setItem('user', JSON.stringify({
                ...user,
                name: userData.name || user.name
            }));

        } catch (error) {
            setMessage(error.message);
            console.error('Ошибка:', error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <section className="profile-section">
            <h2 className="head-text">Мои данные</h2>
            <hr className="divider" />
            <div className="input-grid">
                <div className="column">
                    <input
                        type="text"
                        name="name"
                        placeholder="Имя"
                        value={userData.name}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="middlename"
                        placeholder="Отчество"
                        value={userData.middlename}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Телефон"
                        value={userData.phoneNumber}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="town"
                        placeholder="Город"
                        value={userData.town}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="street"
                        placeholder="Улица"
                        value={userData.street}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="column">
                    <input
                        type="text"
                        name="surname"
                        placeholder="Фамилия"
                        value={userData.surname}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="birthdate"
                        placeholder="Дата рождения"
                        value={userData.birthdate}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="house"
                        placeholder="Дом"
                        value={userData.house}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="apartment"
                        placeholder="Квартира"
                        value={userData.apartment}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <button
                className="save-button"
                onClick={DataSave}
                disabled={isLoading}
            >
                {isLoading ? 'Сохранение...' : 'Сохранить'}
            </button>
            {message && <p className="message">{message}</p>}
        </section>
    );
};

export default UserData;