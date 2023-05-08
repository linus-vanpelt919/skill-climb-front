import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
			<Head>
      <title>タイトル</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
				<h1>
					Read <Link href="/auth/useAuth">this page!</Link>
				</h1>
		</>
  )
}
