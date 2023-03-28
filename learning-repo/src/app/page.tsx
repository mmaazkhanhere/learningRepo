import React from 'react'

export default function Home() {
  return (
    <>
      <section className="container mx-auto h-8 p-5">
        <div className="flex justify-between">
          <div className="flex">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-purple-400 to-red-600"></div>
            <h1 className="ml-2 text-3xl text-gray-600">Logo</h1>
          </div>
          <div className="mt-2">
            <a href="" className="p-4 text-gray-600 hover:text-purple-600">Home</a>
            <a href="" className="p-4 text-gray-600 hover:text-purple-600">Shop</a>
            <a href="" className="p-4 text-gray-600 hover:text-purple-600">Blog</a>
            <a href="" className="p-4 text-gray-600 hover:text-purple-600">Contact</a>
            <a href="" className="rounded-full bg-purple-600 p-3 px-5 text-gray-50 hover:bg-purple-700 hover:text-purple-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 inline-block">
                <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
              </svg>
              Cart (0)
            </a>
          </div>
        </div>
      </section>

      <section className="flex mt-20 ">
        <div className="w-2/5 flex flex-col justify-center">
          <h2 className="font-serif text-5xl text-gray-600 mb-4">Some Catch Title here</h2>
          <p className="uppercase tracking-wide text-gray-600">Our brand tagline goes here</p>
          <p className="uppercase tracking-wide text-gray-600">Our brand motto goes here</p>
          <a href="" className="bg-gradient-to-r from-red-600 to-pink-500 rounded-full py-4 px-8 text-gray-50 uppercase text-xl self-start my-5">Shop Now</a>
        </div>

        <div className="w-3/5">
          <img src="https://banner2.cleanpng.com/20190607/eky/kisspng-e-commerce-business-retail-online-shopping-service-retail-intersoft-5cfad8d5b3adb8.404565371559943381736.jpg" alt="" className="w-full" />
        </div>
      </section>
    </>
  )
}
