import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LoginStatus } from '../types/Login';
import InfoAlert from '../components/icons/InfoAlert';
import SuccessAlert from '../components/icons/SuccessAlert';
import ErrorAlert from '../components/icons/ErrorAlert';
import WarningAlert from '../components/icons/WarningAlert';

import { useUser } from '../context/user';
import { AppwriteException } from 'appwrite';

function AlertSVG(status: LoginStatus | undefined) {
  switch (status) {
    case undefined:
    case LoginStatus.Info:
      return <InfoAlert />;
    case LoginStatus.Success:
      return <SuccessAlert />;
    case LoginStatus.Warning:
      return <WarningAlert />;
    case LoginStatus.Error:
      return <ErrorAlert />;
  }
}

export default function Login() {
  const user = useUser();
  const isAuthenticated = user?.current !== null;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [alertStatus, setAlertStatus] = useState<LoginStatus>();
  const [alertMsg, setAlertMsg] = useState<string>('');

  const navigate = useNavigate();

  async function handleLogin() {
    try {
      await user?.login(email, password);
      navigate('/');
    } catch (e) {
      setAlertStatus(LoginStatus.Warning);
      setAlertMsg((e as AppwriteException).message);
    }
  }

  async function handleRegister() {
    try {
      await user?.register(email, password, name);
      handleLogin();
    } catch (e: unknown) {
      setAlertStatus(LoginStatus.Warning);
      setAlertMsg((e as AppwriteException).message);
    }
  }

  async function handleLogout() {
    try {
      await user?.logout();
      navigate(0);
    } catch (e: unknown) {
      setAlertStatus(LoginStatus.Warning);
      setAlertMsg((e as AppwriteException).message);
    }
  }

  return (
    <main className="flex-grow flex flex-col gap-8">
      <h1 className="text-2xl font-bold text-center mt-32">欢迎注册/登陆</h1>
      <form
        className="flex flex-col gap-4 items-center"
        autoComplete="true"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleLogin();
          }
        }}
      >
        <input
          autoComplete="email"
          type="email"
          placeholder="邮箱/必填*"
          className="input input-bordered w-3/4 md:w-2/5"
          onChange={(e) => {
            const value = e.currentTarget.value;
            setEmail(value);
          }}
        />
        <input
          autoComplete="password"
          type="password"
          placeholder="密码/必填*"
          className="input input-bordered w-3/4 md:w-2/5"
          onChange={(e) => {
            const value = e.currentTarget.value;
            setPassword(value);
          }}
        />
        <input
          autoComplete="username"
          type="text"
          placeholder="用户名/登陆时可不填"
          className="input input-bordered w-3/4 md:w-2/5"
          onChange={(e) => {
            const value = e.currentTarget.value;
            setName(value);
          }}
        />
      </form>{' '}
      <div className="flex flex-row gap-8 justify-center">
        <button className="btn" onClick={() => handleRegister()}>
          注册
        </button>
        {!isAuthenticated ? (
          <button
            className="btn"
            onClick={() => {
              handleLogin();
            }}
          >
            登陆
          </button>
        ) : (
          <>
            <button
              className="btn btn-neutral"
              onClick={() => {
                // @ts-ignore
                document.getElementById('logout-modal')?.showModal();
              }}
            >
              注销
            </button>
            <dialog id="logout-modal" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">注销</h3>
                <p className="py-4">请确认是否注销？</p>
                <div className="modal-action">
                  <form method="dialog" className="flex gap-2">
                    <button className="btn" onClick={() => handleLogout()}>
                      确认
                    </button>
                    <button className="btn btn-neutral">取消</button>
                  </form>
                </div>
              </div>
            </dialog>
          </>
        )}
      </div>
      <div
        role="alert"
        className={`alert alert-${alertStatus} w-4/5 md:w-1/2 mx-auto ${
          alertStatus ? '' : 'hidden'
        }`}
      >
        {AlertSVG(alertStatus)}
        <span>{alertMsg}</span>
      </div>
    </main>
  );
}
