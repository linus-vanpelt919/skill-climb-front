// utils/auth.ts
import axios from 'axios';
import { useRouter } from 'next/router';

export async function checkIfUserIsLoggedIn() {
  try {
    // 認証状態を確認するAPIエンドポイントにリクエストを送信
    const response = await axios.get('http://localhost/user', {
      withCredentials: true,
    });
    console.log(response);

    const isLoggedIn = !!response.data;

    return isLoggedIn;
  } catch (error) {
    console.error('Error checking login status:', error);
    return false;
  }
}

export const handleLogout = async () => {
  const router = useRouter();
  try {
    await axios.post('http://localhost/api/logout', null, {
      withCredentials: true,
    });
    router.push('/auth/login');
  } catch (error) {
    console.error(error);
  }
};
