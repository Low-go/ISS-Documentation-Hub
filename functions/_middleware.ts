interface Env {
  // Add any environment variables here if needed
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request } = context;
  const url = new URL(request.url);
  const cookie = request.headers.get('Cookie') || '';
  
  // Check if already logged in
  if (cookie.includes('auth=valid')) {
    return context.next();
  }
  
  // Handle login form submission
  if (url.pathname === '/login' && request.method === 'POST') {
    const formData = await request.formData();
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    
    // Check credentials
    if (username === 'issuser' && password === 'Mahalo@12345') {
      return new Response('', {
        status: 302,
        headers: {
          'Location': '/',
          'Set-Cookie': 'auth=valid; Path=/; HttpOnly; Secure; Max-Age=20000; SameSite=Strict'
        }
      });
    } else {
      return new Response(getLoginHTML(true), {
        headers: { 'Content-Type': 'text/html' }
      });
    }
  }
  
  // Show login page
  return new Response(getLoginHTML(false), {
    headers: { 'Content-Type': 'text/html' }
  });
};

function getLoginHTML(showError: boolean): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
      background-color: #f5f5f5;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    
    .login-container {
      background: white;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 400px;
    }
    
    h1 {
      color: #990000;
      font-size: 24px;
      margin-bottom: 30px;
      text-align: center;
    }
    
    .form-group {
      margin-bottom: 20px;
    }
    
    label {
      display: block;
      margin-bottom: 6px;
      color: #333;
      font-size: 14px;
    }
    
    input {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
    }
    
    input:focus {
      outline: none;
      border-color: #990000;
    }
    
    button {
      width: 100%;
      padding: 12px;
      background-color: #990000;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
      margin-top: 10px;
    }
    
    button:hover {
      background-color: #7a0000;
    }
    
    .error {
      background-color: #fee;
      color: #c00;
      padding: 10px;
      border-radius: 4px;
      margin-bottom: 20px;
      font-size: 14px;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="login-container">
    <h1>Documentation Login</h1>
    ${showError ? '<div class="error">Invalid username or password</div>' : ''}
    <form method="POST" action="/login">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" name="username" required autofocus>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" required>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</body>
</html>
  `;
}