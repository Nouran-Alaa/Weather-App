import React, { useContext, useState } from 'react'
import { SearchContext } from '../../Context/SearchContext'
import { useQuery } from '@tanstack/react-query'
export default function SearchHistory() {
    const [arr1, setarr1] = useState(localStorage.getItem('favcities')? JSON.parse(localStorage.getItem('favcities')) : [])
    let {data}=useQuery({
        queryKey: ["fav"],
        queryFn: getFav,
        refetchInterval:100,
        refetchOnWindowFocus: true,
      })
      function getFav(){
        setarr1(localStorage.getItem('favcities')? JSON.parse(localStorage.getItem('favcities')) : [])
        return 1
    }
    let {Search, setSearch}= useContext(SearchContext)
    function findCity(searchName){
      localStorage.setItem('mycity', searchName)
      // console.log(localStorage.getItem('mycity'))      
    }
  return (
    <>
<div className="flex justify-center items-center min-h-screen">
  <div>
    <div className="fixed w-[25%] inset-0 left-0 overflow-hidden">

      <section className="absolute inset-y-0 right-0 pl-10 flex">
        <div x-transition:enter="transition-transform ease-out duration-300" x-transition:enter-start="transform translate-x-full" x-transition:enter-end="transform translate-x-0" x-transition:leave="transition-transform ease-in duration-300" x-transition:leave-start="transform translate-x-0" x-transition:leave-end="transform translate-x-full" className="">
          <div className="h-full flex flex-col py-6 bg-white opacity-75 shadow-xl">
            <div className="mt-4 px-4">
              <p className="ml-2 text-gray-400">Favorite cities</p>
            </div>
      
            <div className="mt-4 px-4 h-full overflow-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {
                    arr1? arr1.map((city,i)=>(
                        <div key={i} onClick={()=>findCity(city.searchName)} className="bg-gray-50 hover:bg-gray-100 p-4 cursor-pointer rounded-md border border-gray-300 transition-colors duration-300">
                        <h3 className="text-lg font-semibold text-black mb-2">City name</h3>
                        <p className="text-gray-600 z-30">{city.name}</p>
                        </div>
                    )) : 'Favorite cities are here'
                  }
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</div>
    </>
  )
}
