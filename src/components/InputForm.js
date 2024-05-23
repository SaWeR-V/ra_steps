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
        const dateValue = document.getElementById('date');
        const distanceValue = document.getElementById('distance');

        if (dateValue.value.length !== 0 && distanceValue.value.length !== 0) {
            data.push({
                date: dateValue.value,
                distance: distanceValue.value
            })

            dateValue.value = '';
            distanceValue.value = '';
        }
        
        for (let i = 0; i < data.length; i++) {
            localStorage.setItem(data[i].date, data[i].distance);
        }
        refreshState();
    }
}