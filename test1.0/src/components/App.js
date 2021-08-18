import React, { useState, useEffect } from "react";
import axios from 'axios';
import styles from '../style/style.module.css';
import ReactDOM from 'react-dom'


//Show array like list
function getData(num) {

    const list = [];
    for (let index = 0; index < num; index++) {
        list[index] = <p className={styles.text_in_box}>Овечока {index + 1}</p>

    }
    return list
}

function App() {
    //const [state, setState] = useState({ first: 0, second: 0, third: 0, fourth: 0 });
    const [state1, setState1] = useState([]);
    const [state2, setState2] = useState({ num: "" });

    //Button
    function handleClickStart() {
        const arr = axios.get('http://192.168.43.4:8000/api/main').then(response => {
            /*setState({
                first: response.data.main.first,
                second: response.data.main.second,
                third: response.data.main.third,
                fourth: response.data.main.fourth
            });*/
            localStorage.setItem("state", JSON.stringify(response.data.main));
            setState1(JSON.parse(localStorage.getItem("state")));
            localStorage.setItem("increment", 0);
        });
        console.log("JSON")
        console.log(state1)
        console.log("Clicked Start")
    }

    function handleClickReset() {
        console.log("Clicked Reset")
    }

    //Request
    //Fetch data function request
    useEffect(() => {
        const id = setInterval(() => {
            //sendDataToServer()
            fetchData()
        }, 1000);
        return () => clearInterval(id);
    }, [])

    //fetch data
    function fetchData() {
        try {
            const arr = axios.get('http://192.168.43.4:8000/api/fetch').then(response => {
                localStorage.setItem("state", JSON.stringify(response.data));
                setState1(JSON.parse(localStorage.getItem("state")).main);
                let i = parseInt(localStorage.getItem("increment"));
                i = i + 1;
                localStorage.setItem("increment", i);
                if (localStorage.getItem("increment") == 10) {
                    try {
                        const brr = axios.post('http://192.168.43.4:8000/api/data',
                            {
                                first: JSON.parse(localStorage.getItem("state")).main.first,
                                second: JSON.parse(localStorage.getItem("state")).main.second,
                                third: JSON.parse(localStorage.getItem("state")).main.third,
                                fourth: JSON.parse(localStorage.getItem("state")).main.fourth
                            },
                            { headers: { "Content-Type": "application/json" } })
                            .then(response => {
                                localStorage.setItem("state", JSON.stringify(response.data));
                                setState1(JSON.parse(localStorage.getItem("state")).main);
                                console.log(response.data.main)
                                console.log(response.data.max)
                                console.log(response.data.min)
                                console.log("clicked send")
                            });
                    }
                    catch (err) {

                    }
                    localStorage.setItem("increment", 0);
                }
            });
        } catch (err) {
            console.log(err);
        }
    }

    //send data onClick button
    const sendDataToServer = () => {
        try {
            const brr = axios.post('http://192.168.43.4:8000/api/data',
                {
                    first: JSON.parse(localStorage.getItem("state")).first,
                    second: JSON.parse(localStorage.getItem("state")).second,
                    third: JSON.parse(localStorage.getItem("state")).third,
                    fourth: JSON.parse(localStorage.getItem("state")).fourth
                },
                { headers: { "Content-Type": "application/json" } })
                .then(response => {
                    localStorage.setItem("state", JSON.stringify(response.data.main));
                    setState1(JSON.parse(localStorage.getItem("state")));
                    console.log(JSON.parse(localStorage.getItem("state")).first)
                    console.log(response.data.main)
                    console.log("clicked send")
                });
        }
        catch (err) {

        }
    }

    //Command
    function handleFormChange(event) {
        setState2({
            num: event.target.value
        })
    }
    function handleFormSubmit(event) {
        try {
            const brr = axios.post('http://192.168.43.4:8000/api/action',
                {
                    pos: state2.num
                }).then(response => {
                    console.log(response.data.success);
                });
        }
        catch (err) {
            console.log(err)
        }
        event.preventDefault()
    }

    function handleKill() {
        try {
            const brr = axios.post('http://192.168.43.4:8000/api/action',
                {
                    pos: "удалить"
                }).then(response => {
                    console.log(response.data.success);
                });
        }
        catch (err) {
            console.log(err)
        }
    }

    //Render
    return (

        <div>
            <div className={styles.main}>
                <h3 className={styles.title_main}>Test</h3>
                <div className={styles.info}>
                    {
                        //left block
                    }
                    <h3 className={styles.title_left}>Info</h3>
                    <div className={styles.blockButton}>
                        <button onClick={handleClickStart} className={styles.buttonStart}>Start</button>
                        <button onClick={handleClickReset} className={styles.buttonReset}>Reset</button>
                    </div>

                    <div>
                        <div>
                            <p>День: {JSON.parse(localStorage.getItem("state")).main != null ?
                                JSON.parse(localStorage.getItem("state")).main.day :
                                ""
                            }</p>
                            <p>Общий количество овечек: {JSON.parse(localStorage.getItem("state")).main != null ?
                                (parseInt(JSON.parse(localStorage.getItem("state")).main.first) +
                                    parseInt(JSON.parse(localStorage.getItem("state")).main.second) +
                                    parseInt(JSON.parse(localStorage.getItem("state")).main.third) +
                                    parseInt(JSON.parse(localStorage.getItem("state")).main.fourth) +
                                    parseInt(JSON.parse(localStorage.getItem("state")).main.kill)) :
                                0
                            }</p>
                            <p>Количество убитых: {
                                JSON.parse(localStorage.getItem("state")).main != null ?
                                    parseInt(JSON.parse(localStorage.getItem("state")).main.kill) : 0
                            }</p>
                            <p>Количество живых: {JSON.parse(localStorage.getItem("state")).main != null ?
                                (parseInt(JSON.parse(localStorage.getItem("state")).main.first) +
                                    parseInt(JSON.parse(localStorage.getItem("state")).main.second) +
                                    parseInt(JSON.parse(localStorage.getItem("state")).main.third) +
                                    parseInt(JSON.parse(localStorage.getItem("state")).main.fourth)) :
                                0
                            }</p>
                            <p>Самый насалённый загон: {JSON.parse(localStorage.getItem("state")).indexMax}</p>
                            <p>Количество: {JSON.parse(localStorage.getItem("state")).max} </p>
                            <p>Самый менее насалённый загон: {JSON.parse(localStorage.getItem("state")).indexMin}</p>
                            <p>Количество: {JSON.parse(localStorage.getItem("state")).min} </p>
                        </div>
                        <div></div>
                    </div>

                </div>
                <div className={styles.box}>
                    {
                        //right block
                    }
                    <h3 className={styles.title_box}>Фермочка для овечок</h3>
                    <div className={styles.box_inner}>
                        <h4 className={styles.title_box_inner}>Загон 1</h4>

                        {state1 != null ? getData(state1.first) : ""}
                    </div>
                    <div className={styles.box_inner}>
                        <h4 className={styles.title_box_inner}>Загон 2</h4>
                        {state1 != null ? getData(state1.second) : ""}
                    </div>
                    <div className={styles.box_inner}>
                        <h4 className={styles.title_box_inner}>Загон 3</h4>
                        {state1 != null ? getData(state1.third) : ""}
                    </div>
                    <div className={styles.box_inner}>
                        <h4 className={styles.title_box_inner}>Загон 4</h4>
                        {state1 != null ? getData(state1.fourth) : ""}
                    </div>
                    {/* <button onClick={this.handleClick}>click</button> */}
                </div>
                <div>
                    <button onClick={handleKill}>Зарубить овечок</button><br></br>
                    <form onSubmit={handleFormSubmit}>
                        <input type="text" onChange={handleFormChange} />
                        <input type="submit" value="Выполнить" /><br></br>
                    </form>
                    <p>1.добавить - 2.удалить - 3.переместить</p>
                </div>
            </div>
        </div>
    );
}

export default App;