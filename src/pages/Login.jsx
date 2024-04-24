import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@mui/material";
import { login } from "../api/firebase";

import '../css/theme.css'; // CSS 임포트

export default function Login() {
    const [theme, setTheme] = useState('light'); // 초기 테마를 'light'로 설정

    // 테마를 토글하는 함수
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    // 테마에 따른 배경 이미지 경로 변경
    const backgroundImage = theme === 'light' ? '/img/flowLight.png' : '/img/flowNight.png';
    const logoImage = theme === 'light' ? '/img/LightLogo.png' : '/img/DarkLogo.png';
    const HelloLogo = theme === 'light' ? '/img/HelloLight.png' : '/img/HelloBlack.png';

    const [userInfo, setUserInfo] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const handleChange = e => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }
    const handleSubmit = e => {
        e.preventDefault();
        try {
            login(userInfo);
            navigate('/');
        } catch (error) {
            alert("이메일 또는 비밀번호가 잘못되었습니다.");
            console.error(error);
        }
    }


    return (
        <div className={`background ${theme}`} style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            <Card id='cardMain' className="cardMain">
                <div id='login-box' className="loginBox">
                    <div className={`welcome-message`}>
                        <img src={HelloLogo} alt='Hello' style={{ maxWidth: '10%' }} />
                    </div>
                    <img src={logoImage} alt='LOGO' style={{ maxWidth: '20%' }} />

                    <br />
                    <input type="email" name='email' placeholder="닉네임 혹은 이메일" className="commonInputStyle"
                        onChange={handleChange} />
                    <br />
                    <input type="password" name='password' placeholder="비밀번호" className="commonInputStyle"
                        onChange={handleChange} />
                    <br />
                    <button className="fill" onClick={handleSubmit}>로그인</button>
                    <br /><br />
                    <p style={{ color: theme === 'light' ? '#dca3e7' : '#ffffff' }}>혹시 계정이 없으신가요?</p>
                    <div>
                        <Link to="/register" className={`custom-button ${theme}`}>가입하기</Link>
                    </div>
                    <br />
                    <div className="container">
                        <button onClick={toggleTheme} className="fill">테마변경</button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
