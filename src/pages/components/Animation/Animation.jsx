import React, { useEffect, useState } from 'react';
import './Animation.css';

// global constants
const fieldWidth = 760;
const fieldHeight = 400;
let ballDiameter = 100;

const vx = 5; // 5px / f
const vy = 5; // 5px / f

let maxLeft = fieldWidth - ballDiameter - 6;
let maxTop = fieldHeight - ballDiameter - 6;

// global variables
let running = false;
let goRight = true;
let goDown = true;

let left = 0;
let top_ = 0;

const Animation = () => {
    const [ballImage, setBallImage] = useState(''); // state สำหรับเก็บภาพบอล

    const runClick = () => {
        running = !running;
        render();
    };

    const calculate = () => {
        if (goRight) {
            left += vx;
            if (left >= maxLeft) {
                goRight = false;
            }
        } else {
            left -= vx;
            if (left <= 0) {
                goRight = true;
            }
        }

        if (goDown) {
            top_ += vy;
            if (top_ >= maxTop) {
                goDown = false;
            }
        } else {
            top_ -= vy;
            if (top_ <= 0) {
                goDown = true;
            }
        }
    };

    const render = () => {
        document.getElementById('ball').style.left = left + 'px';
        document.getElementById('ball').style.top = top_ + 'px';

        const btnRun = document.getElementById('run');
        if (running) {
            btnRun.innerHTML = '<span className="bi bi-pause">&nbsp;PAUSE</span>';
            btnRun.classList.remove('btn-success');
            btnRun.classList.add('btn-danger');
            document.getElementById('ball').classList.add('spin');
        } else {
            btnRun.innerHTML = '<span className="bi bi-play">&nbsp;RUN</span>';
            btnRun.classList.remove('btn-danger');
            btnRun.classList.add('btn-success');
            document.getElementById('ball').classList.remove('spin');
        }
    };

    const process = () => {
        if (running) {
            calculate();
            render();
        }
    };

    const initial = () => {
        document.getElementById('field').style.width = fieldWidth + 'px';
        document.getElementById('field').style.height = fieldHeight + 'px';
        document.getElementById('ball').style.width = ballDiameter + 'px';
        document.getElementById('ball').style.height = ballDiameter + 'px';
    };

    useEffect(() => {
        initial();
        const interval = setInterval(process, 25);
        return () => clearInterval(interval);
    }, []);

    // const changeBallImage = (image) => {
    //     setBallImage(image);  // อัปเดต state สำหรับภาพบอล
    //     const ball = document.getElementById('ball');
    //     if (image) {
    //         ball.style.backgroundImage = `url(${image})`;
    //     } else {
    //         ball.style.backgroundImage = '';
    //     }
    // };

    const changeBallImage = (image) => {
        setBallImage(image);  // อัปเดต state สำหรับภาพบอล
    };
    

    return (
        <div id="container">
            <div id="field">
                <div id="ball" style={{ backgroundImage: `url(${ballImage})` }}></div>
            </div>
            <div id="contrtol">
                <button id="run" className={running ? "btn btn-danger" : "btn btn-success"} onClick={runClick}>
                    <span className="bi bi-play">&nbsp;RUN</span>
                </button>
                <button id="noneBtn" className="btn btn-primary" onClick={() => changeBallImage('')}>NONE</button>
                <button id="basketballBtn" className="btn btn-primary" onClick={() => changeBallImage('./Basketball.png')}>BASKETBALL</button>
                <button id="footballBtn" className="btn btn-primary" onClick={() => changeBallImage('./football.png')}>FOOTBALL</button>
                <button id="volleyballBtn" className="btn btn-primary" onClick={() => changeBallImage('./volleyball.png')}>VOLLEYBALL</button>
                <button id="humanballBtn" className="btn btn-primary" onClick={() => changeBallImage('./human.jpg')}>HUMAN</button>
                <button id="cartoonballBtn" className="btn btn-primary" onClick={() => changeBallImage('./onepiece.png')}>CARTOON</button>
                <button id="logoballBtn" className="btn btn-primary" onClick={() => changeBallImage('./logo.png')}>LOGO</button>
            </div>
        </div>
    );
};

export default Animation;