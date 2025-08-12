// Эмулятор калькулятора вышивки
class EmbroideryCalculator {
    constructor() {
        // Стоимость программы в зависимости от сложности
        this.programPrices = {
            'simple': 1200,      // Обычная
            'medium': 1500,      // Средняя
            'complex': 2500,     // Сложная
            'artistic': 5000     // Художественная
        };

        // Базовые цены по типам изделий
        this.prices = {
            1: { // Готовые изделия 
                base_price: 20,
                stitch_price: 0.06,        // 60 руб. за 1000 стежков
                minimum_price: 2300
            },
            2: { // Бейсболки
                base_price: 25,
                stitch_price: 0.08,        // 80 руб. за 1000 стежков
                minimum_price: 2300
            },
            3: { // Крой
                base_price: 18,
                stitch_price: 0.05,        // 50 руб. за 1000 стежков
                minimum_price: 2300
            },
            4: { // Нашивки, шевроны
                base_price: 30,
                stitch_price: 0.035,        // 35 руб. за 1000 стежков
                minimum_price: 2300
            },
            5: { // Ремувки - фиксированная цена
                base_price: 100,
                minimum_price: 2300
            },
            6: { // Носки
                base_price: 40,
                minimum_price: 2300
            },
            7: { // Именная вышивка
                base_price: 150,
                minimum_price: 2300
            },
            8: { // Манжеты
                base_price: 50,
                minimum_price: 2300
            },
            9: { // Значки
                base_price: 80,
                minimum_price: 2300
            }
        };

        // Дополнительные услуги
        this.additionalServices = {
            metallic_thread: 1.5,    // Коэффициент для металлизированных ниток
            glow_thread: 2.0,        // Коэффициент для светящихся ниток
            reflective_thread: 1.8,  // Коэффициент для светоотражающих ниток
            'embroidery_3d': 1.4,    // Коэффициент для 3D вышивки (+40% к стоимости)
            fabric_doubling: 100     // Фиксированная цена за дублирование ткани
        };
    }

    // Расчет количества стежков по размеру и заполнению
    calculateStitches(width, height, fillPercentage) {
        // Конвертируем миллиметры в сантиметры для расчета
        const widthCm = width / 10;
        const heightCm = height / 10;
        // В среднем 100 стежков на квадратный сантиметр при 100% заполнении
        const area = widthCm * heightCm;
        const stitchesPerCm = 100;
        return Math.round((area * stitchesPerCm * fillPercentage) / 100);
    }

    // Основной метод расчета стоимости
    calculatePrice(params) {
        const {
            itemType,          // Тип изделия
            width,            // Ширина вышивки в мм
            height,           // Высота вышивки в мм
            fillPercentage,   // Процент заполнения
            quantity,         // Количество изделий
            complexity,       // Сложность вышивки
            additionalServices // Массив дополнительных услуг
        } = params;

        // Стоимость программы
        let price = this.programPrices[complexity] || this.programPrices.simple;

        const itemPrices = this.prices[itemType];

        // Для изделий с фиксированной ценой
        if ([5, 6, 7, 8, 9].includes(itemType)) {
            price += itemPrices.base_price * quantity;
        } else {
            // Расчет через количество стежков
            const stitches = this.calculateStitches(width, height, fillPercentage);
            price += (itemPrices.base_price + (stitches * itemPrices.stitch_price)) * quantity;
        }

        // Применение дополнительных услуг
        if (additionalServices) {
            additionalServices.forEach(service => {
                if (service === 'fabric_doubling') {
                    price += this.additionalServices.fabric_doubling * quantity;
                } else {
                    price *= this.additionalServices[service];
                }
            });
        }

        // Применение минимальной цены
        return Math.max(price, itemPrices.minimum_price);
    }

    // Генерация HTML формы для расчета
    generateCalculationForm(itemType) {
        // Базовая форма для всех типов
        let form = `
            <div class="calculation-form">
                <h3>Расчет стоимости вышивки</h3>
                <div class="form-group">
                    <label>Сложность вышивки:</label>
                    <select name="complexity">
                        <option value="simple">Обычная (1200 руб.)</option>
                        <option value="medium">Средняя (1500 руб.)</option>
                        <option value="complex">Сложная (2500 руб.)</option>
                        <option value="artistic">Художественная вышивка (5000 руб.)</option>
                    </select>
                </div>
        `;

        // Для изделий с расчетом по стежкам
        if (![5, 6, 7, 8, 9].includes(itemType)) {
            form += `
                <div class="form-group">
                    <label>Размер вышивки:</label>
                    <input type="number" name="width" placeholder="Ширина (мм)" min="1" max="1000">
                    <input type="number" name="height" placeholder="Высота (мм)" min="1" max="1000">
                </div>
                <div class="form-group">
                    <label>Плотность вышивки:</label>
                    <select name="fillPercentage">
                        <option value="100">Заполняемость 100% (полное заполнение)</option>
                        <option value="70">Заполняемость 70% (художественная вышивка)</option>
                        <option value="50">Заполняемость 50% (логотип с каркасом)</option>
                        <option value="30">Заполняемость 30% (тонкие линии)</option>
                    </select>
                </div>
            `;
        }

        // Для всех типов
        form += `
            <div class="form-group">
                <label>Количество:</label>
                <input type="number" name="quantity" value="1" min="1">
            </div>
            <div class="form-group">
                <label>Дополнительные услуги:</label>
                <div class="checkbox-group">
                    <label>
                        <input type="checkbox" name="metallic_thread">
                        Металлизированные нитки
                    </label>
                    <label>
                        <input type="checkbox" name="glow_thread">
                        Светящиеся нитки
                    </label>
                    <label>
                        <input type="checkbox" name="reflective_thread">
                        Светоотражающие нитки
                    </label>
                    <label>
                        <input type="checkbox" name="embroidery_3d">
                        3D вышивка
                    </label>
                    <label>
                        <input type="checkbox" name="fabric_doubling">
                        Дублирование ткани
                    </label>
                </div>
            </div>
            <button type="button" onclick="calculatePrice()">Рассчитать стоимость</button>
            <div id="price-result"></div>
        </div>`;

        return form;
    }
}

// Функция расчета цены при нажатии кнопки
function calculatePrice() {
    const form = document.querySelector('.calculation-form');
    if (!form) return;

    const itemType = parseInt(document.querySelector('.nopayment-select').value);
    if (!itemType) return;
    
    const params = {
        itemType: itemType,
        complexity: form.querySelector('[name="complexity"]').value,
        quantity: parseInt(form.querySelector('[name="quantity"]').value) || 1,
        additionalServices: []
    };

    // Для изделий с расчетом по стежкам
    if (![5, 6, 7, 8, 9].includes(itemType)) {
        const width = parseFloat(form.querySelector('[name="width"]').value);
        const height = parseFloat(form.querySelector('[name="height"]').value);
        const fillPercentage = parseInt(form.querySelector('[name="fillPercentage"]').value);

        if (!width || !height) {
            alert('Пожалуйста, укажите размеры вышивки');
            return;
        }

        params.width = width;
        params.height = height;
        params.fillPercentage = fillPercentage || 100;
    }

    // Сбор дополнительных услуг
    ['metallic_thread', 'glow_thread', 'reflective_thread', 'embroidery_3d', 'fabric_doubling'].forEach(service => {
        const checkbox = form.querySelector(`[name="${service}"]`);
        if (checkbox && checkbox.checked) {
            params.additionalServices.push(service);
        }
    });

    try {
        // Расчет и отображение цены
        const price = calculator.calculatePrice(params);
        const resultDiv = document.getElementById('price-result');
        if (resultDiv) {
            let details = '';
            
            // Добавляем стоимость программы
            details += `
                <p>Стоимость программы: ${calculator.programPrices[params.complexity]} руб.</p>
            `;
            
            // Добавляем детали расчета для изделий со стежками
            if (![5, 6, 7, 8, 9].includes(itemType)) {
                const stitches = calculator.calculateStitches(params.width, params.height, params.fillPercentage);
                details += `
                    <p>Размер: ${params.width}мм × ${params.height}мм</p>
                    <p>Заполнение: ${params.fillPercentage}%</p>
                    <p>Количество стежков: ${stitches}</p>
                `;
            }

            resultDiv.innerHTML = `
                <h4>Расчет стоимости:</h4>
                ${details}
                <p>Количество: ${params.quantity} шт.</p>
                <p>Итоговая стоимость: ${price.toFixed(2)} руб.</p>
                <p class="note">* Это примерный расчет. Для точной стоимости свяжитесь с нами.</p>
            `;
        }
    } catch (error) {
        console.error('Ошибка при расчете стоимости:', error);
        alert('Произошла ошибка при расчете стоимости. Пожалуйста, проверьте введенные данные.');
    }
}
