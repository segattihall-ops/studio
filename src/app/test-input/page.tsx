'use client';

import { useState } from 'react';

export default function TestInputPage() {
  const [value, setValue] = useState('');

  return (
    <div style={{ padding: '50px', backgroundColor: 'white', minHeight: '100vh' }}>
      <h1 style={{ color: 'black', marginBottom: '20px' }}>Input Test Page</h1>

      {/* Native HTML input */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ color: 'black', display: 'block', marginBottom: '5px' }}>
          Native HTML Input:
        </label>
        <input
          type="text"
          placeholder="Type here..."
          style={{
            padding: '10px',
            border: '2px solid black',
            fontSize: '16px',
            width: '300px',
          }}
        />
      </div>

      {/* Controlled input with state */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ color: 'black', display: 'block', marginBottom: '5px' }}>
          Controlled Input with State:
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type here..."
          style={{
            padding: '10px',
            border: '2px solid blue',
            fontSize: '16px',
            width: '300px',
          }}
        />
        <p style={{ color: 'black', marginTop: '5px' }}>Value: {value}</p>
      </div>

      {/* Email input */}
      <div>
        <label style={{ color: 'black', display: 'block', marginBottom: '5px' }}>
          Email Input:
        </label>
        <input
          type="email"
          placeholder="email@example.com"
          style={{
            padding: '10px',
            border: '2px solid green',
            fontSize: '16px',
            width: '300px',
          }}
        />
      </div>
    </div>
  );
}
