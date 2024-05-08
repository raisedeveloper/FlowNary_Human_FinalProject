// 기본
import React from "react";
import { Stack } from "@mui/material";

// components 연결
import SnsBar from '../../common/aside&bar/SnsBar';
import Aside from "../../common/aside&bar/Aside";
import SettingDetail from '../Setting'

export default function Setting() {
    return (
        <>
            <SnsBar />
            {/* <ProfileMenu /> */}
            <Stack direction="row" spacing={0} sx={{ height: "100vh" }}>
                <Stack direction="column" spacing={2} sx={{ flex: 0.3 }}>
                    <Stack sx={{ flexGrow: 1 }}>
                        <Aside />
                    </Stack>
                </Stack>
                <Stack direction="column" spacing={2} sx={{ flex: 1.5}}>
                    <SettingDetail />
                </Stack>
            </Stack>
        </>
    );
}
