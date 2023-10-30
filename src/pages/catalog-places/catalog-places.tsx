import * as React from 'react'
import { useState } from 'react'
import { InputText, Excel } from '../../components'

import Chart from 'chart.js/auto'

const CatalogPlaces = () => {
	
	const [city, setCity] = useState<string>('')
	const [items, setItems] = useState<any>({pm2_5: [], pm10: [], time:[]})
	
	const handleClickSend = () => {
		console.log(city)
		const API_KEY_YANDEX = '85eaff1b-ef9e-4c11-89bc-ca01d1ae43de'
		const API_URL_GEO_DATA = `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY_YANDEX}&geocode=${city}&format=json`
		fetch(API_URL_GEO_DATA)
		.then(response => response.json())
		.then(data => get_list_from_pos_str(data))
		.then(coordinates =>
			{
				const API_OPEN_METEO = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${coordinates[0]}&longitude=${coordinates[1]}&hourly=pm10,pm2_5`
				fetch(API_OPEN_METEO)
				.then(response => response.json())
				.then(data => {
					console.log(data)
					setItems(data.hourly)
				}).catch(err => window.alert('Ошибка получения данных.'))
			}
		)
		.catch(err => window.alert('Ошибка получения данных.'))
    }
	
	function get_list_from_pos_str(data: any) {
		const pos_str = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
		return pos_str.split(' ', 2)
	}
	
	const handleChangeCity = (event: any) => {
        setCity(event.target.value)
    }
	
	const headers = ['Время', 'Количество частиц pm10', 'Количество частиц pm2_5']
	
    return (
		<>
			<h2>Статистика загрязнённости воздуха</h2>
			<InputText 
				type="text" 
				placeholder="Введите название города"
				onChange={(e: any) => handleChangeCity(e)}
			/>
			<button onClick={handleClickSend}>Получить данные</button>
			<Excel data={items} headers={headers}/>
		</>
    )
}

export default CatalogPlaces
