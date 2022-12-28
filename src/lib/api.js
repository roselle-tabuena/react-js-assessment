const FIREBASE_DOMAIN = 'https://react-js-assessment-98c9e-default-rtdb.firebaseio.com'

export async function addContact(contactData) {

  const response = await fetch(`${FIREBASE_DOMAIN}/contacts.json`, {
    method: 'POST',
    body: JSON.stringify(contactData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  
  if (!response.ok) {
    throw new Error('Unable to add contact something went wrong.')
  }

  const data = await response.json();
  
  return { id: data.name, 
           ...contactData 
         }
}

export async function fetchContact(id) {

  const response = await fetch(`${FIREBASE_DOMAIN}/contacts/${id}.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Unable to fetch contact')
  }

  if (data === null) {
    return null
  }

  return {id, ...data}
}

export async function fetchContacts() {
  const response = await fetch(`${FIREBASE_DOMAIN}/contacts.json`)

  const data = await response.json();

  if(!response.ok) {
      throw new Error(data.message || 'Unable to load contacts')
  }

  const contacts = [];

  for (const key in data) {

      contacts.push({ id: key,
                      ...data[key] });
  }
  
  return contacts;
}

export async function deleteContact(id) {
  const response = await fetch(`${FIREBASE_DOMAIN}/contacts/${id}.json`, { method: 'DELETE'});

  const data = await response.json();

  return data
}


export async function updateContact(id, obj) {

  const response = await fetch(`${FIREBASE_DOMAIN}/contacts/${id}.json`, { method: 'PUT',
    body: JSON.stringify(obj)
  });

  const data = await response.json();

  if(!response.ok) {
    throw new Error(data.message || 'Contact can\'t be updated.')
  }

  return data
}