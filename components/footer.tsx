export default function Footer() {
  return (
    <footer className="bg-custom-black text-white body-font">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <a className="flex font-medium items-center md:justify-start justify-center text-white">
          <span className="ml-3 text-xl">Based Memes</span>
        </a>
        <p className="text-sm text-white sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
          © 2024 —
          <a
            href="https://twitter.com/serverConnectd"
            className="text-white ml-1"
            rel="noopener noreferrer"
            target="_blank"
          >
            @serverConnectd
          </a>
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <a className="ml-3 text-white">
            <svg
              fill="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
            </svg>
          </a>
        </span>
      </div>
    </footer>
  );
}
