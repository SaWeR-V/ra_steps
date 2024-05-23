import React, {useState} from "react";
import { InputForm } from "./InputForm";

export function DataTable() {
    const [_, changeState] = useState(Object.entries(localStorage));
    const sortedData = Object.entries(localStorage).sort((a, b) => {
        const dateA = new Date(a[0].split('.').reverse().join('-'));
        const dateB = new Date(b[0].split('.').reverse().join('-'));
        return dateB - dateA;
    });

    function refreshState() {
        changeState(Object.entries(localStorage))
    }

    if (Object.entries(localStorage).length !== 0) {
        return (
            <div>
                <InputForm refreshState={refreshState} />
                <div className="row headers">
                    <p className="description">Дата (ДД.ММ.ГГ)</p>
                    <p className="description">Пройдено км</p>
                    <p className="description">Действия</p>
                </div>
                <div className="data_table">
                    {sortedData.map((item, index) => 
                        <div key={index} className="row" id={index + 1}>
                            <p className="description">{item[0]}</p>
                            <p className="description">{item[1]}</p>
                            <div className="buttons_container">
                                <button className="edit_btn" id={index + 1} onClick={Edit}></button>
                                <button className="remove_btn" id={index + 1} onClick={Remove}></button>   
                            </div>
                        </div>
                    )}   
                </div>
            </div>
        )
    }
    else {
        return (
            <InputForm refreshState={refreshState} />
        )
    }
        
    function Remove(event) {
        for (let i = 0; i < sortedData.length; i++) {
            if (+event.target.id - 1 === i) {
                localStorage.removeItem(sortedData[i][0], sortedData[i][1]);
            }
        }
        
        refreshState();

        const rowsHeaders = document.querySelector('.headers');
        const table = document.querySelector('.data_table');

        if (Object.entries(localStorage).length === 0) {
            [rowsHeaders, table].forEach(item => item.remove())
        }
    }

    function Edit(event) {
        const dateInput = document.getElementById('date');
        const distanceInput = document.getElementById('distance');

        for (let i = 0; i < sortedData.length; i++) {
            if (+event.target.id - 1 === i) {
                dateInput.value = sortedData[i][0];
                distanceInput.value = sortedData[i][1];
                localStorage.removeItem(dateInput.value);
            }
        }
    }
}