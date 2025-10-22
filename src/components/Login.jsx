import React from "react";

const Login = () => {
  return (
    <main>
      <header>
        <svg
          className="text-red500"
          width="33"
          height="27"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m26.463.408 3.2 6.4h-4.8l-3.2-6.4h-3.2l3.2 6.4h-4.8l-3.2-6.4h-3.2l3.2 6.4h-4.8l-3.2-6.4h-1.6a3.186 3.186 0 0 0-3.184 3.2l-.016 19.2a3.2 3.2 0 0 0 3.2 3.2h25.6a3.2 3.2 0 0 0 3.2-3.2V.408h-6.4Z"
            fill="currentColor"
          />
        </svg>
      </header>

      <section>
        <h1>Login</h1>
        <form>
          <div>
            <input type="text" placeholder="Email address" />
          </div>
          <div>
            <input type="text" placeholder="Password" />
          </div>
          <button>
            Login to your account
          </button>
        </form>
      </section>
    </main>
  );
};

export default Login;
