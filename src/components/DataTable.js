import React, {useState} from "react";
import { InputForm } from "./InputForm";

export function DataTable() {
    const filteredArray = Object.entries(localStorage).filter(item => item[0].includes('Steps'));
    const [_, changeState] = useState(filteredArray);

    let joinedArr = []; 

    for (let i = 0; i < filteredArray.length; i++) {
        joinedArr.push({
            id: filteredArray[i][0],
            date: filteredArray[i][1].split(',')[0],
            distance: filteredArray[i][1].split(',')[1]})
    }

    const sortedData = joinedArr.sort((a, b) => {
        const dateA = new Date(a.date.split('.').reverse().join('-'));
        const dateB = new Date(b.date.split('.').reverse().join('-'));

        return dateB - dateA;
    });


    function refreshState() {
        changeState(Object.entries(localStorage).filter(item => item[0].includes('Steps')))
    }

    if (filteredArray.length !== 0) {
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
                        <div key={index} className="row" id={item.id}>
                            <p className="description">{item.date}</p>
                            <p className="description">{item.distance}</p>
                            <div className="buttons_container">
                                <button className="edit_btn" id={item.id} onClick={Edit}></button>
                                <button className="remove_btn" id={item.id} onClick={Remove}></button>   
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
            if (event.target.id === sortedData[i].id) {
                localStorage.removeItem(sortedData[i].id);
            }
        }
        
        refreshState();

        const rowsHeaders = document.querySelector('.headers');
        const table = document.querySelector('.data_table');

        if (filteredArray.length === 0) {
            [rowsHeaders, table].forEach(item => item.remove())
        }
    }

    function Edit(event) {
        const dateInput = document.getElementById('date');
        const distanceInput = document.getElementById('distance');

        for (let i = 0; i < sortedData.length; i++) {
            if (event.target.id === sortedData[i].id) {
                dateInput.value = sortedData[i].date;
                distanceInput.value = sortedData[i].distance;
                localStorage.removeItem(sortedData[i].id);
            }
        }
    }
}