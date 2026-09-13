import { useState } from "react"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Pagination from "./components/Pagination"
import Search from "./components/Search"
import UserList from "./components/UserList"
import CreateUser from "./components/CreateUser"

function App() {
	const [showCreateUser, setShowCreateUser] = useState(false);
	const addUserClickHandler = () => {
		console.log('user');

		setShowCreateUser(true);
	}

	return (
		<div>
			<Header />

			<main className="main">
				<section className="card users-container">
					<Search />

					<UserList />

					<button className="btn-add btn" onClick={addUserClickHandler}>Add new user</button>


					<Pagination />

				</section>

				{showCreateUser && <CreateUser />}
			</main>

			<Footer />
		</div>
	)
}

export default App
