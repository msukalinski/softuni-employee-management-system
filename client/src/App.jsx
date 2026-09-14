import { useState } from "react"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Pagination from "./components/Pagination"
import Search from "./components/Search"
import UserList from "./components/UserList"
import CreateUserModal from "./components/CreateUserModal"

function App() {
	const [showCreateUser, setShowCreateUser] = useState(false);

	const addUserClickHandler = () => {
		console.log('user');

		setShowCreateUser(true);
	}

	const closeUserModalHandler = () => {
		setShowCreateUser(false);
	}

	const addUserSubmitHandler = (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);

		const userData = Object.fromEntries(formData);

		console.log(userData);
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

				{showCreateUser && <CreateUserModal
					onClose={closeUserModalHandler}
					onSubmit={addUserSubmitHandler}
				/>}
			</main>

			<Footer />
		</div>
	)
}

export default App
