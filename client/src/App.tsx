import { useEffect, useState } from "react";
function App() {
	const [items, setItems] = useState<{ title: string }[]>([]);
	const apiBase = import.meta.env.VITE_API_URL || "";

	console.log(apiBase);

	useEffect(() => {
		fetch(apiBase + "/api/items")
			.then((response) => response.json())
			.then((data) => setItems(data))
			.catch((error) => {
				console.error("Error fetching items:", error);
			});
	}, []);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const text = formData.get("text") as string;
		if (text) {
			fetch(apiBase + "/api/items", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ title: text, user_id: 1 }),
			})
				.then((response) => response.json())
				.then(() => {
					setItems((prevItems) => [...prevItems, { title: text }]);
				})
				.catch((error) => {
					console.error("Error adding item:", error);
				});
			event.currentTarget.reset();
		}
	};

	return (
		<section>
			<h1>Je suis le composant : `App`</h1>

			<h2>Liste des items :</h2>
			<ul>
				{items.map((item, index) => (
					<li key={index}>{item.title}</li>
				))}
			</ul>

			<h2>Ajouter un item</h2>
			<form onSubmit={handleSubmit}>
				<label htmlFor="text">Text</label>
				<input type="text" id="text" name="text" />
				<button type="submit">Ajouter</button>
			</form>
		</section>
	);
}

export default App;
