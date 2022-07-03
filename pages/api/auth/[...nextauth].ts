import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { UserService } from '../../../service/db';
import prisma from '../../../utils/prisma';

//配置next-auth，参考https://next-auth.js.org/configuration/options
export default NextAuth({
  // provider配置凭证登录
  providers: [
    CredentialsProvider({
      name: 'login',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'Username',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const user = await UserService.get(credentials.username);
        if (user?.pwd === credentials.password) {
          return {
            name: user.name,
            userId: user.id,
            status: 'success',
          };
        }
        return { status: 'reject' };
      },
    }),
  ],
  secret: process.env.SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    //回调函数
    async signIn({ user, account, profile, email, credentials }) {
      // 登录回调，如果authorize不成功，重定向到login界面，并附带错误信息参数
      if (user?.status === 'reject') {
        return '/auth/login/?msg=invalid';
      }

      return true;
    },
  },
  events: {},
  theme: { colorScheme: 'light' },
  debug: true,
});
