interface HomePageProps {};

const HomePage: React.FC<HomePageProps> = () => {

    return (
        <div className="bg-blue-500 text-white p-4 rounded-md">
          <h1 className="text-xl font-bold">Hello, Tailwind!</h1>
          <p>This is a simple example of using Tailwind CSS in React.</p>
        </div>
      );
}

export default HomePage;