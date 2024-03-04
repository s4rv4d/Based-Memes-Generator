export default function Header() {
  return (
    <header className="text-black bg-transparent body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
        <a className="flex font-medium items-center text-white mb-4 md:mb-0">
          <span className="ml-3 text-xl">Based Memes</span>
        </a>
        <div className="inline-flex items-center text-base mt-4 md:mt-0">
          <w3m-button />
        </div>
      </div>
    </header>
  );
}
