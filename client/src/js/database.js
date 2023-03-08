import { openDB } from "idb";

const initdb = async () =>
	openDB("jate", 1, {
		upgrade(db) {
			if (db.objectStoreNames.contains("jate")) {
				console.log("jate database already exists");
				return;
			}
			db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
			console.log("jate database created");
		},
	});

export const putDb = async (content) => {
	const contactsDb = await initdb("jate", 1);
	const tx = contactsDb.transaction("jate", "readwrite");
	const store = tx.objectStore("jate");
	const request = await store.put({ value: content });
	const result = await request;
	console.log(result);
	return result;
};

export const getDb = async () => {
	const contactsDb = await initdb("jate", 1);
	const tx = contactsDb.transaction("jate", "readonly");
	const store = tx.objectStore("jate");
	const request = await store.getAll();
	const result = await request;
	console.log(result);
	return result;
};

initdb();
