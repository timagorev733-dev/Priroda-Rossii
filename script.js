
        // Функция переключения страниц
        function showPage(pageId) {
            // Скрыть все страницы
            const pages = document.querySelectorAll('.page');
            pages.forEach(page => {
                page.classList.remove('active');
            });

            // Показать выбранную страницу
            const selectedPage = document.getElementById(pageId);
            if (selectedPage) {
                selectedPage.classList.add('active');
            }

            // Изменить класс body для смены фона
            document.body.className = 'page-' + pageId;

            // Если открыта страница викторины, отображаем вопросы
            if (pageId === 'quiz') {
                displayQuiz();
            }

            // Прокрутить страницу вверх
            window.scrollTo(0, 0);
        }

        // Данные для викторины (10 вопросов по всем местам)
        const allQuizQuestions = [
            {
                text: "Какова максимальная глубина озера Байкал?",
                options: ["1242 метра", "1642 метра", "2042 метра", "1420 метров"],
                correct: 1
            },
            {
                text: "Сколько процентов мировых запасов пресной воды содержится в Байкале?",
                options: ["Около 10%", "Около 15%", "Около 20%", "Около 25%"],
                correct: 2
            },
            {
                text: "Какой редкий хищник обитает в горах Алтая?",
                options: ["Амурский тигр", "Полярный волк", "Снежный барс (ирбис)", "Гепард"],
                correct: 2
            },
            {
                text: "Сколько озер насчитывается на территории Карелии?",
                options: ["Около 20 тысяч", "Около 40 тысяч", "Около 60 тысяч", "Около 80 тысяч"],
                correct: 2
            },
            {
                text: "Как называется знаменитый водопад в Карелии?",
                options: ["Кивач", "Илья Муромец", "Кинзелюкский", "Тальниковый"],
                correct: 0
            },
            {
                text: "Сколько действующих вулканов на Камчатке?",
                options: ["19", "29", "39", "49"],
                correct: 1
            },
            {
                text: "Как называется самый высокий действующий вулкан Евразии?",
                options: ["Корякский", "Авачинский", "Ключевской", "Шивелуч"],
                correct: 2
            },
            {
                text: "Какова протяженность Уральских гор?",
                options: ["Более 1500 км", "Более 2000 км", "Более 2500 км", "Более 3000 км"],
                correct: 2
            },
            {
                text: "Чем особенно знаменит Урал?",
                options: ["Нефтью и газом", "Драгоценными камнями (самоцветами)", "Алмазами", "Каменным углем"],
                correct: 1
            },
            {
                text: "Какой остров с деревянными церквями является объектом ЮНЕСКО в Карелии?",
                options: ["Валаам", "Соловецкий", "Кижи", "Ольхон"],
                correct: 2
            }
        ];

        // Функция для отображения викторины
        function displayQuiz() {
            const container = document.getElementById('quizContainer');
            if (!container) return;
            
            container.innerHTML = '';
            
            allQuizQuestions.forEach((q, idx) => {
                const questionDiv = document.createElement('div');
                questionDiv.className = 'quiz-question';
                questionDiv.innerHTML = `
                    <p>${idx + 1}. ${q.text}</p>
                    <div class="quiz-options" data-question="${idx}">
                        ${q.options.map((opt, optIdx) => `
                            <div class="quiz-option">
                                <input type="radio" name="q${idx}" value="${optIdx}" id="q${idx}_${optIdx}">
                                <label for="q${idx}_${optIdx}">${opt}</label>
                            </div>
                        `).join('')}
                    </div>
                `;
                container.appendChild(questionDiv);
            });
            
            // Показываем кнопку отправки
            const submitBtn = document.getElementById('submitQuiz');
            if (submitBtn) submitBtn.style.display = 'block';
            
            // Очищаем предыдущий результат
            const resultDiv = document.getElementById('quizResult');
            if (resultDiv) resultDiv.innerHTML = '';
        }

        // Проверка ответов
        function checkQuiz() {
            const resultDiv = document.getElementById('quizResult');
            resultDiv.innerHTML = '';
            
            allQuizQuestions.forEach((q, idx) => {
                const selected = document.querySelector(`input[name="q${idx}"]:checked`);
                const isCorrect = selected && parseInt(selected.value) === q.correct;
                const userAnswer = selected ? q.options[parseInt(selected.value)] : 'Не выбран';
                const correctAnswer = q.options[q.correct];
                
                const resultItem = document.createElement('div');
                resultItem.className = `quiz-result-item ${isCorrect ? 'quiz-result-correct' : 'quiz-result-wrong'}`;
                resultItem.innerHTML = `
                    <strong>${idx + 1}. ${q.text}</strong><br>
                    ${isCorrect ? '✅' : '❌'} <strong>Ваш ответ:</strong> ${userAnswer}<br>
                    ${!isCorrect ? `<strong>✓ Правильный ответ:</strong> ${correctAnswer}` : '<span style="color: #059669;">✓ Верно!</span>'}
                `;
                resultDiv.appendChild(resultItem);
            });
            
            resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        // Обработчик для кнопки викторины
        function initQuizButton() {
            const submitBtn = document.getElementById('submitQuiz');
            if (submitBtn) {
                const newSubmitBtn = submitBtn.cloneNode(true);
                submitBtn.parentNode.replaceChild(newSubmitBtn, submitBtn);
                newSubmitBtn.addEventListener('click', checkQuiz);
            }
        }

        // Инициализация при загрузке
        document.addEventListener('DOMContentLoaded', () => {
            const hash = window.location.hash.substring(1);
            if (hash && document.getElementById(hash)) {
                showPage(hash);
            } else {
                showPage('home');
            }
            initQuizButton();
        });

