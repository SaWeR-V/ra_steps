import { v4 as uuidv4 } from 'uuid';

export function InputForm({refreshState}) {
    const data = [];


    return (
        <form className='input_form'>
            <label> Дата (ДД.ММ.ГГ)
                <input type="text" className="input_frame" id='date' onInput={check} maxLength={10}/>
            </label>
            <label> Пройдено км
                <input type="text" className="input_frame" id='distance'/>
            </label>
            <button className='save_btn' onClick={Save}>OK</button>
        </form>
    )

    function check() {
        const dateValue = document.getElementById('date');

        setTimeout(() => {
            if (dateValue.value.charAt(1) === '.' || dateValue.value.charAt(1) === ' ') {
                dateValue.value = '0' + dateValue.value.trim();
            }
            else if (dateValue.value.charAt(4) === '.'|| dateValue.value.charAt(4) === ' ') {
                dateValue.value = dateValue.value.slice(0, 3) + '0' + dateValue.value.slice(3);
            }

            if (dateValue.value.length >= 2 && dateValue.value.length < 3) {
                dateValue.value = dateValue.value+ '.';
            }
            else if (dateValue.value.length >= 5 && dateValue.value.length < 6) {
                dateValue.value = dateValue.value+ '.';
            }
        }, 500)

    }

    function Save(e) {
        e.preventDefault();
        const dateValue = document.getElementById('date').value;
        const distanceValue = parseFloat(document.getElementById('distance').value);

        if (dateValue.length !== 0 && !isNaN(distanceValue)) {
            const filteredArray = Object.entries(localStorage).filter(item => item[0].includes('Steps'));

            let dateExists = false;

            for (let i = 0; i < filteredArray.length; i++) {
                const [storedDate, storedDistance] = filteredArray[i][1].split(',');
                if (storedDate === dateValue) {
                    const updatedDistance = parseFloat(storedDistance) + distanceValue;
                    localStorage.setItem(filteredArray[i][0], `${dateValue},${updatedDistance}`);
                    dateExists = true;
                    break;
                }
            }

            if (!dateExists) {
                const uniqueKey = uuidv4();
                localStorage.setItem(`Steps: ${uniqueKey}`, `${dateValue},${distanceValue}`);
            }

            document.getElementById('date').value = '';
            document.getElementById('distance').value = '';
        }

        refreshState();
    }
}