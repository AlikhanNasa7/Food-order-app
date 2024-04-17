import React, { useEffect, useState } from 'react'
import MealsItem from './MealsItem'
import useHttp from '../hooks/useHttp'
import Error from './Error'
const requestConfig = {}
const Meals = () => {
    const {data: loadedMeals,isLoading,error} = useHttp('http://localhost:3000/meals/',requestConfig,[])

    if (isLoading){
        return (
            <p className='center'>Fetching meals...</p>
        )
    }
    if (error){
        return (
            <Error title="Failed to fetch meals" message={error}/>
        )
    }
    return (
        <>
            {loadedMeals && (
                <ul id='meals'>
                {loadedMeals.map(item => (
                    <MealsItem key={item.id} image={item.image} name={item.name} price={item.price} description={item.description} id={item.id}/>
                ))}
                </ul>
            )}
        </>
    )
}

export default Meals