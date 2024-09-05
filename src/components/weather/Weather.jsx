import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import SearchHistory from '../SearchHistory/SearchHistory'
import { SearchContext } from '../../Context/SearchContext'
import { Formik, useFormik } from 'formik'
import * as yup from 'yup'
export default function Weather() {
  let schema= yup.object().shape({
    name: yup.string().matches(/^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/, "City name shouldn't be specail carachters or numbers").min(2,'minimum letgth is 2'),
  })
  let formik = useFormik({
    initialValues:{
        name:'',
    },
    validationSchema:schema,
    onChange: search,
    onSubmit: search,
    onBlur: search,
});
  let days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
  let [arr, setarr] = useState(localStorage.getItem('favcities')? JSON.parse(localStorage.getItem('favcities')) : [])
  let {Search, setSearch}= useContext(SearchContext)
  const [response, setresponse] = useState(0)
  let s=localStorage.getItem('mycity')
  const [fillStar, setfillStar] = useState(false)
  function search({name}){
      localStorage.setItem('mycity', name)
      setSearch(localStorage.getItem('mycity'))
      s=localStorage.getItem('mycity')
      }
    function fav(){
        if(!fillStar)
        {
            arr.push({
                name: data.data.location.name,
                searchName: Search
            })
        }
        else{
            arr.pop()
        }
        let strArr= JSON.stringify(arr)
        localStorage.setItem('favcities', strArr)
        setfillStar(!fillStar)
    }
    let res=useQuery({
      queryKey: ["response"],
      queryFn: getSearch,
      refetchInterval:1000,
      refetchOnWindowFocus: true,
  })
     async function getSearch(){
      
        let res= await axios.get(`https://api.weatherapi.com/v1/search.json?&days=3&key=c6f75ac9dca54c5984a115815242106&q=${s? s: 'Cairo'}&aqi=no`)
        setresponse(res)
      // setSearch(localStorage.getItem('mycity'))
      s=localStorage.getItem('mycity')

        return response
    }
    let {data}=useQuery({
        queryKey: ["weather"],
        queryFn: getCity,
        refetchInterval:1000,
        refetchOnWindowFocus: true,
    })
    function getCity(){
        return axios.get(`https://api.weatherapi.com/v1/forecast.json?&days=3&key=c6f75ac9dca54c5984a115815242106&q=${response? response.data[0].name:'Cairo'}%20${response? response.data[0].country:''}&aqi=no`)
  }
  let date= new Date(data?.data?.forecast?.forecastday[0]?.date);
  return (
    <div className='flex justify-center items-center'>
    <SearchHistory/>
    <div className='flex flex-col w-[80%] justify-center items-center h-full'>
  <section className="mt-4 w-[30%]">
    <div>
      <div className="input flex items-center flex-nowrap gap-4 m-auto mt-5 mb">
      <form className="max-w-sm mx-auto flex flex-nowrap gap-3" onSubmit={formik.handleSubmit} onBlur={formik.handleBlur} onChange={formik.handleChange}>
      <input type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} name='name' id="name"  className="w-full h-8 text-sm leading-tight text-gray-700 border-0 focus:outline-none focus:border-0 rounded shadow appearance-none focus:shadow-outline" placeholder="Search" />
      <span className="input-group-text" id="addon-wrapping"><i className="fa fa-search" aria-hidden="true" /></span>
      </form>
      </div>
      {formik.errors.name && formik.touched.name? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{formik.errors.name}</span>
          </div>: null}
    </div>
  </section>
            
  <div id="current-city" className="h-full w-1/2 relative m-auto flex justify-center items-center text-center bg-slate-400 bg-opacity-75 mt-4 lg:p-5 p-2 mb-5">
  <i onClick={()=>fav()} className={`${fillStar? 'fa-solid' : 'fa-regular'} text-yellow-400 fa-star absolute top-5 left-5`}></i>
  <div>
  {
    data?.data?.forecast?.forecastday[0]? <>
    <span className="flex justify-between items-center">
    <p className="darkblue">{days[date.getDay()]}</p>
    <p className="darkblue">{data.data.forecast.forecastday[0].date}</p>
  </span>
  <h1>{data.data.location.name}</h1>
  <h6 className="darkblue">{data.data.location.country}</h6>
  <div className="flex justify-center items-center">
    <img src={data.data.current.condition.icon}/>
    <h2>{data.data.current.temp_c} °C</h2>
  </div>
  <div>
    <h4 className="flex justify-center items-center">{data.data.forecast.forecastday[0].day.maxtemp_c} °C <i className="fa-solid fa-temperature-high p-1" /> <div className="column" /><i className="fa-solid fa-temperature-low p-1" />{data.data.forecast.forecastday[0].day.mintemp_c} °C</h4>
  </div>
  <p className="darkblue">{data.data.current.condition.text}</p>
  <span className="pe-1"><i className="fa fa-umbrella" aria-hidden="true" /> <span id="rain">{data.data.current.humidity}%</span></span>
  <span className="pe-1"><i className="fa-solid fa-wind" /> <span id="wind">{data.data.current.wind_kph}km/h</span></span>
  <span><i className="fa-regular fa-compass" /> <span id="direc">{(data.data.current.wind_dir=="N")?'North': (data.data.current.wind_dir=="E")? 'East':(data.data.current.wind_dir=="W")? 'West' : (data.data.current.wind_dir=="S")?'South' : (data.data.current.wind_dir=="NE")? 'North East' : (data.data.current.wind_dir=="NW")? 'North West' :(data.data.current.wind_dir=="SE")? 'South East' :'South West'}</span></span>
    </> : ''
  }
</div>

  </div>
  
</div>

    </div>
  )
}