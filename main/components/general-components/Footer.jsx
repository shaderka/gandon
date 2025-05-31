import React from 'react';
import "../../app/styles/general/footer.scss"
import { FaTelegram, FaVk, FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="logo-section">
                        <h2 className="logo-title">POIZON51.RU</h2>
                        <p className="logo-description">
                            Надёжный маркетплейс для импорта товаров с Poizon.
                        </p>
                    </div>

                    <div className="social-section">
                        <h3 className="social-title">Мы в соцсетях</h3>
                        <div className="social-icons">
                            <a
                                href="https://t.me/obedochki"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-icon"
                                aria-label="Telegram"
                            >
                                <FaTelegram style={{ color: '#0088cc' }} />
                            </a>
                            <a
                                href="https://vk.com/doratitovna"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-icon"
                                aria-label="VKontakte"
                            >
                                <FaVk style={{ color: '#4a76a8' }} />
                            </a>
                            <a
                                href="https://instagram.com/youraccount"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-icon"
                                aria-label="Instagram"
                            >
                                <FaInstagram style={{ color: '#e1306c' }} />
                            </a>
                            <a
                                href="mailto:your@email.com"
                                className="social-icon"
                                aria-label="Email"
                            >
                                <MdEmail style={{ color: '#d44638' }} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="divider"></div>

                <div className="footer-bottom">
                    <p className="copyright">
                        © {new Date().getFullYear()} OOO "ДОЛБОЕБ-КОРПОРЕЙШЕН"
                    </p>

                    <div className="footer-links">
                        <a href="#" className="footer-link">
                            Политика конфиденциальности
                        </a>
                        <a href="#" className="footer-link">
                            Условия использования
                        </a>
                        <a href="#" className="footer-link">
                            Контакты
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;