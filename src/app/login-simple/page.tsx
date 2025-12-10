'use client';

export default function SimpleLoginPage() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        window.location.href = '/dashboard';
      } else {
        const data = await response.json().catch(() => ({}));
        alert('Login failed: ' + (data?.error?.message || 'Unknown error'));
      }
    } catch (error) {
      alert('Error: ' + (error as Error).message);
    }
  };

  return (
    <html>
      <head>
        <title>Simple Login</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{ margin: 0, padding: 0, fontFamily: 'system-ui, sans-serif', backgroundColor: '#1a1a2e', color: 'white', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '400px', padding: '20px' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '28px' }}>Admin Login</h1>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', backgroundColor: '#2a2a3e', padding: '30px', borderRadius: '8px' }}>
            <div>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '16px',
                  border: '1px solid #444',
                  borderRadius: '4px',
                  backgroundColor: '#1a1a2e',
                  color: 'white',
                  boxSizing: 'border-box'
                }}
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '16px',
                  border: '1px solid #444',
                  borderRadius: '4px',
                  backgroundColor: '#1a1a2e',
                  color: 'white',
                  boxSizing: 'border-box'
                }}
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                fontWeight: '600',
                backgroundColor: '#9333ea',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '10px'
              }}
            >
              Sign In
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '12px', color: '#888' }}>
            This is a simplified login page without UI components
          </p>
        </div>
      </body>
    </html>
  );
}
