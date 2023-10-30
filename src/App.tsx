import * as React from 'react'
import {Login, CatalogPlaces, About, NotFound} from './pages'
import {userContext} from './contexts/User' 
import {Link, Routes, Route} from 'react-router-dom' 
import "./styles.css"
import { RequireAuth } from './hocs/withAuth'

const User = {
  role: 'user', 
  name: ''
}

const ROUTES = {
  main: '/',
  catalog: '/catalog',
  about: '/about',
}

function App() {
  return (
    <div className='rootStyle'>
		<header>
			<nav>
				<ul>
					<li><Link to={ROUTES.main}>Главная</Link></li>
					<li><Link to={ROUTES.catalog}>Каталог</Link></li>
					<li><Link to={ROUTES.about}>О сервисе</Link></li>
					<li><Link to='any'>Страница ошибки 404</Link></li>
				</ul>
			</nav>
		</header>
		<main>
			<Routes>
				<Route path={ROUTES.main} element={<Login />} />
				<Route path={ROUTES.catalog} element={
						<RequireAuth>
							<CatalogPlaces />
						</RequireAuth>
					} />
				<Route path={ROUTES.about} element={<About />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
			
			{/* <userContext.Provider value={User}>
				<Login />
			</userContext.Provider> */}
			
		</main>
    </div>
  );
}

export default App;
