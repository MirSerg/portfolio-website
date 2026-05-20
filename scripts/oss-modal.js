// scripts/oss-modal.js
(function() {

        // ========== СКРИПТ ДЛЯ КНОПКИ "НАВЕРХ" ==========
    const scrollBtn = document.getElementById("scrollToTopBtn");

    // Показываем/скрываем кнопку при скролле
    function toggleScrollButton() {
        if (window.scrollY > 300) {
            scrollBtn.classList.add("show");
        } else {
            scrollBtn.classList.remove("show");
        }
    }

    // Плавная прокрутка наверх
    function scrollToTop(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    // Добавляем обработчики событий для кнопки "Наверх"
    if (scrollBtn) {
        window.addEventListener("scroll", toggleScrollButton);
        scrollBtn.addEventListener("click", scrollToTop);
    }
    
    // Ждем полной загрузки DOM
    document.addEventListener('DOMContentLoaded', function() {
        const ossLink = document.getElementById('ossLink');
        
        // Проверяем, существует ли ссылка
        if (!ossLink) {
            console.error('Элемент #ossLink не найден');
            return;
        }
        
        // Создаем модальное окно
        const modal = document.createElement('div');
        modal.className = 'oss-modal';
        modal.id = 'ossModal';
        
        // Собираем все ссылки из footer-links
        const footerLinks = document.querySelector('.footer-links');
        const links = footerLinks ? footerLinks.querySelectorAll('a') : [];
        
        // Формируем HTML модального окна
        let linksHtml = '';
        if (links.length > 0) {
            links.forEach(link => {
                linksHtml += `<li><a href="${link.href}" target="_blank" rel="noopener noreferrer">${link.textContent}</a></li>`;
            });
        } else {
            linksHtml = '<li>Нет доступных ссылок</li>';
        }
        
        modal.innerHTML = `
            <div class="oss-modal-content">
                <div class="oss-modal-header">
                    <h3>📦 Open Source Software & Attribution</h3>
                    <button class="oss-modal-close">&times;</button>
                </div>
                <div class="oss-modal-body">
                    <p style="margin-bottom: 16px; color: #666; line-height: 1.5;">Использованные ресурсы и атрибуции:</p>
                    <ul class="oss-links-list">
                        ${linksHtml}
                    </ul>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        const modalElement = document.getElementById('ossModal');
        const closeBtn = modalElement.querySelector('.oss-modal-close');
        
        // Открытие модального окна при клике на иконку
        ossLink.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            modalElement.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
        
        // Закрытие по крестику
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                modalElement.classList.remove('show');
                document.body.style.overflow = '';
            });
        }
        
        // Закрытие по клику вне окна
        modalElement.addEventListener('click', function(e) {
            if (e.target === modalElement) {
                modalElement.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
        
        // Закрытие по Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modalElement.classList.contains('show')) {
                modalElement.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    });
})();