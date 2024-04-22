import React from "react";

import SnsBar from '../components/Important/SnsBar';

export default function NotFound() {
  return (
    <div style={{ height: 'calc(100vh - 40px)'}}>
      <SnsBar />
      <img src="/img/NotFound.png" alt="error" style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }} />
    </div>
  )

}