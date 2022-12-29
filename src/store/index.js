import { createSlice, configureStore } from '@reduxjs/toolkit';

const contactSlice = createSlice({
  name: 'counter',
  initialState: {
    onEdit: [false, null],
    contacts: []
  },
  reducers: {
    addContact(state, action) {
      const data = action.payload;
      
      state.contacts.push(data)
    },
    removeContact(state, action) {
      const id = action.payload

      const new_contacts = state.contacts.filter(contact => contact.id !== id)

      state.contacts = new_contacts
    },
    onEditContact(state, action) {
      const id = action.payload

      state.onEdit = [true, id] 
    },
    updateContact(state, action) {
      const index  = state.contacts.findIndex(contact => action.payload.id === contact.id)

      state.contacts[index] = action.payload
      state.onEdit = [false, null]
    },
    populateContacts(state, action) {
      state.contacts = action.payload
    },
    cancelEdit(state, action) {
      if (!state.onEdit) return;
      
      state.onEdit = [false, null]
    }
  }
});

                                
const store = configureStore({ reducer: contactSlice.reducer })

export const contactActions = contactSlice.actions;

export default store;