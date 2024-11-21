import "../assets/scss/background.scss";
import Card from "../components/Card";

function Home() {
  return (
    <>
      <div className="w-full bg-slate-200 min-h-screen">
        <div className="flex flex-col items-center justify-center h-[30vh] bg-gray-100">
          <h1 className="text-4xl font-bold mb-4 text-sky-600">
            Welcome to Doctor Consultation
          </h1>
          <p className="text-lg text-gray-600">
            Book your appointment with ease!
          </p>
        </div>
        <Card />
      </div>
    </>
  );
}

export default Home;
