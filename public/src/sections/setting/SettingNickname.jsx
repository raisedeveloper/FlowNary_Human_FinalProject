// 기본
import React, { useEffect, useState } from "react";
import {
  Box, Button, Card, TextField, InputAdornment, Typography, InputLabel, MenuItem, FormControl, Select, Avatar,
  IconButton, Grid, Stack
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

export default function SettingNickname(props) {
  const [nickname, setNickname] = useState('');
  const [checkingNickname, setCheckingNickname] = useState(props.checkingNickname);

  useEffect(() => {
    const interval = setInterval(() => {
      if (nickname === '') {
        setNickname(props.nickname);
        clearInterval(interval);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [props.nickname]);

  const checkNickname = () => {
    axios.get('http://localhost:8090/user/nickname',
      {
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

        const nicknames = userList.map(user => user.nickname);
        if (nicknames.includes(nickname)) {
          Swal.fire({
            text: "닉네임이 중복됩니다.",
            icon: "warning"
          });
          props.changeChenckingNickname(0);
          return;
        }
        Swal.fire({
          icon: "success",
          text: "닉네임 사용 가능합니다!",
        });
        props.onNicknameChange(nickname);
        props.changeChenckingNickname(1);
        return;
      }).catch(error => {
        console.error('Error fetching nicknames:', error);
      });
  }
  const handleNickname = (e) => {
    setNickname(e.target.value);
  };

  return (
    <>
      <Grid container style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <Grid item xs={8} md={10} lg={10.8}>
          <LightTooltip
            title="별명을 입력하세요." arrow placement="bottom" >
            <TextField
              required
              fullWidth
              label="닉네임"
              variant="standard"
              value={nickname || ''}
              onChange={handleNickname}
              sx={{ mt: 2, width: '100%' }}
            />
          </LightTooltip>
        </Grid>
        <Grid item xs={4} md={2} lg={1.2}>
          <Button onClick={checkNickname} variant="contained" sx={{ backgroundColor: 'rgb(54, 11, 92)', width: '10%' }} style={{ margin: '20px 0px 0px 5px' }} >확인</Button>
        </Grid>
      </Grid>

    </>
  );

}