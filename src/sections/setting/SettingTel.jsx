// 기본
import React, { useEffect, useState } from "react";
import {
  Button, TextField, Grid
} from "@mui/material";
import axios from "axios";

// css 연결
import './setting.css';

// alert 창
import Swal from "sweetalert2";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip arrow {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    boxShadow: theme.shadows[1],
    fontSize: 16,
  },
}));

export default function SettingTel(props) {
  console.log(props);
  const [tel, setTel] = useState('');
  const [checkingTel, setCheckingTel] = useState(props.checkingTel);

  useEffect(() => {
    const interval = setInterval(() => {
      if (tel === '') {
        setTel(props.tel);
        clearInterval(interval);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [props.tel]);

  useEffect(() => {
    if (tel) {
      let telValue = tel.replace(/[^0-9]/g, '').toString(); // 숫자 이외의 문자 제거
      if (telValue.length > 11) { telValue = telValue.slice(0, 11); }
      if (telValue.length === 11) {
        telValue = telValue.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
      } else if (telValue.length === 13) {
        telValue = telValue.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
      }
      setTel(telValue);
    }
  }, [tel]);
  
  const checkTel = () => {
    axios.get('http://localhost:8090/user/tel', {
      params: {
        email: props.email
      }
    })
      .then(response => {
        const userList = response.data; // 응답 데이터 전체를 가져옵니다.
        if (!userList) {
          console.error('User list is undefined or null');
          return;
        }
        const tels = userList.map(user => user.tel);
        if (tels.includes(tel)) {
          Swal.fire({
            text: "전화번호가 중복됩니다.",
            icon: "warning"
          });
          props.changeChenckingTel(0);
          return;
        } else {
          Swal.fire({
            icon: "success",
            text: "전화번호 사용 가능합니다!",
          });
          props.onTelChange(tel);
          props.changeChenckingTel(1);
          return;
        }}).catch(error => {
        console.error('Error fetching tels:', error);
      });
  }

  const handleTel = (e) => {
    setTel(e.target.value); props.changeCheckingTel(0);
  };

  return (
    <>
      <Grid container style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <Grid item xs={8} md={10} lg={10.8}>
          <LightTooltip title="' - ' 없이 숫자만 입력하세요." placement='bottom' >
            <TextField
              fullWidth
              label="전화번호"
              variant="standard"
              name="tel"
              value={tel}
              onChange={handleTel}
              sx={{ mt: 2, width: '100%' }}
            />
          </LightTooltip>
        </Grid>
        <Grid item xs={4} md={2} lg={1.2}>
          <Button onClick={checkTel} variant="contained" sx={{ backgroundColor: 'rgb(54, 11, 92)' }} style={{ margin: '20px 0px 0px 5px' }} >확인</Button>
        </Grid>
      </Grid>
    </>
  );

}