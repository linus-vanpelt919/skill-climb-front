import type { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import Layout from '../../components/layout';

const UseAuth: FC = () => {
  return (
    <>
      <section>
        <h1>loginです</h1>
        <Link href="/">top page</Link>
        <Image
          src="/images/img.jpg"
          height={144}
          width={144}
          alt="アイコン"
        />
        <Layout><p>aaa</p></Layout>
      </section>
    </>
  );
};
export default UseAuth;
