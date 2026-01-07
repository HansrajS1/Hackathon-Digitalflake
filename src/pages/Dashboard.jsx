import Layout from "../components/Layout";
import image from '../assets/images/image.png';
export default function Dashboard() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center mt-40 ">
        <img src={image} alt="Dashboard" className=" w-[276px] h-[146px]" />
        <h1 className="text-2xl font-semibold">Welcome to Digitalflake admin</h1>
      </div>
    </Layout>
  );
}