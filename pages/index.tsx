import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] })


const HomePage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-between bg-gray-100">
            <Head>
                <title>SKILL CLIMB</title>
            </Head>
						<Header/>

            <main className="flex flex-col items-center justify-center w-9/12 mt-20">
                <h1 className="text-6xl text-center text-blue-500 mb-6">
                    SKILL CLIMB
                </h1>

                <p className="text-center text-blue-400 text-xl">
                    プログラミングを学んであなたの人生を変えましょう
                </p>

                <div className="flex mt-6 justify-center">
                    <Link href="/register"
                        className="mx-3 px-5 py-3 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-400"
                    >
                        Get Started
                    </Link>

                    <Link
                        href="#"
                        className="mx-3 px-5 py-3 text-white bg-gray-500 rounded-lg shadow-md hover:bg-gray-400"
                    >
                        Learn More
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default HomePage;

