import { useEffect, useState } from "react"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Pagination from "./components/Pagination"
import Search from "./components/Search"
import UserList from "./components/UserList"
import CreateUserModal from "./components/CreateUserModal"

function App() {
	const [users, setUsers] = useState([]);
	const [showCreateUser, setShowCreateUser] = useState(false);
	const [forceRefresh, setForceRefresh] = useState(true);

	useEffect(() => {
		fetch('http://localhost:3030/jsonstore/users')
			.then(response => response.json())
			.then(result => {
				setUsers(Object.values(result));
			})
			.catch(err => alert(err.message));
	}, [forceRefresh]);

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

		const { country, city, street, streetNumber, ...userData } = Object.fromEntries(formData);
		userData.address = {
			country,
			city,
			street,
			streetNumber
		}

		userData.createdAt = new Date().toISOString();
		userData.updatedAt = new Date().toISOString();

		console.log(userData);

		fetch('http://localhost:3030/jsonstore/users', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(userData),
		})
			.then(() => setForceRefresh(state => !state))
			.catch(err => alert(err.message));
	}

	return (
		<div>
			<Header />

			<main className="main">
				<section className="card users-container">
					<Search />

					<UserList users={users} />

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
