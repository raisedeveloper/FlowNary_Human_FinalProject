// 기본
import { React, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Grid, Button, Modal, TextField, Toolbar } from '@mui/material';

// 아이콘
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

// firebase 연결
import { signOut, getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from "firebase/app";

// 스타일 부분 연결
import '../notice.css';
import { Search, SearchIconWrapper, StyledInputBase } from '../snsbarStyle.jsx';
import { useUser } from '../../../UserContext.js';

// firebase Api 연결
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

export default function SnsBar() {

  const { userData } = useUser();

  // 반응형 로고 변환
  const logoImageLarge = '/img/LightLogo.png';
  const logoImageXs = '/img/LightLogoXs.png';

  // Modal 창 열고 끄기
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 버튼 경로 지정
  const navigate = useNavigate();
  const HomeButton = () => { navigate('/'); };
  const handleSearch = () => { navigate('/search'); }
  const handleLinkToLogin = () => { navigate('/login'); }

  // firebase 기초 설정
  // eslint-disable-next-line 
  const app = initializeApp(firebaseConfig);
  // firebase Auth 객체 생성
  const auth = getAuth();

  // firebase 로그인 구현
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) { setIsLoggedIn(true); }
      else { setIsLoggedIn(false); }
    });
    return () => unsubscribe();
  }, [auth]);

  // firebase 로그아웃(2024/04/30 - 정성한 수정)
  const handleLogout = () => {
    signOut(auth).then(() => {
      console.log('로그아웃 성공');      
      navigate('/login');
      localStorage.removeItem("uid");
      localStorage.removeItem("email");
      localStorage.removeItem("profile");
    })
      .catch((error) => {
        console.error('로그아웃 오류:', error);        
      });
  };

  return (
    <div style={{ marginBottom: '6%' }} >
      <AppBar position="absolute" sx={{ background: 'linear-gradient(to right, #7B68EE, rgb(28, 0, 53))', boxShadow: 'none' }}>
        <Toolbar>

          <Grid container spacing={1}>
            <Grid item xs={0.5} lg={0.1}>
            </Grid>

            {/* 로고 부분 */}
            <Grid item lg={1.4} sx={{ placeItems: 'center', display: { xs: 'none', lg: 'flex' }, }}>
              <img src={logoImageLarge} alt='LOGO' style={{ width: '100%', maxWidth: '120px', alignItems: 'center', cursor: 'pointer' }} onClick={HomeButton} />
            </Grid>
            <Grid item xs={1.4} sx={{ placeItems: 'center', display: { xs: 'flex', lg: 'none' }, justifyContent: 'start' }} >
              <img src={logoImageXs} alt='LOGO' style={{ width: '20px', alignItems: 'center', cursor: 'pointer' }} onClick={HomeButton} />
            </Grid>

            <Grid item xs={3} lg={1.8}>
            </Grid>

            {/* 검색창 부분 */}
            <Grid item xs={2} lg={5.5} sx={{ placeItems: 'center', display: 'flex', justifyContent: 'center' }}>
              <Search sx={{ borderRadius: 50, display: { xs: 'flex', lg: 'none' }, alignItems: 'center', justifyContent: 'center' }}  >
                <Button sx={{ cursor: 'pointer' }} onClick={handleOpen}>
                  <SearchIcon sx={{ color: 'white' }} />
                </Button>
                <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description"
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Box sx={{ display: 'flex' }} className='search_modal'>
                    <Grid container>
                      <Grid item xs={8}>
                        <TextField
                          id="outlined-multiline-flexible"
                          label="검색"
                          variant="standard"
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <Button sx={{ cursor: 'pointer' }} onClick={handleSearch}><SearchIcon sx={{ color: 'purple', fontSize: '35px' }} /></Button>
                      </Grid>
                      <Grid item xs={2}>
                        <Button sx={{ cursor: 'pointer' }} onClick={handleClose}><CloseIcon sx={{ color: 'purple', fontSize: '35px' }} /></Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Modal>
              </Search>
              <Search sx={{ borderRadius: 50, display: { xs: 'none', lg: 'flex' } }}  >
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="검색"
                  inputProps={{ 'aria-label': 'search' }}
                />
                <Button sx={{ cursor: 'pointer' }} onClick={handleClose}><CloseIcon sx={{ color: 'white' }} /></Button>
              </Search>
            </Grid>

            <Grid item xs={3} lg={2.1}>
            </Grid>

            {/* 로그아웃 또는 로그인 버튼 부분*/}
            <Grid item xs={1.5} lg={1} sx={{ placeItems: 'center', justifyContent: 'flex-end', display: 'flex' }}>
              {userData && userData.email ? (
                <>
                  <span>{userData.email}</span>
                  <Button style={{ color: 'white', opacity: 0.7 }} onClick={handleLogout}>로그아웃</Button>
                </>
              ) : (
                <Button style={{ color: 'white', opacity: 0.7 }} onClick={handleLinkToLogin}>로그인</Button>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}