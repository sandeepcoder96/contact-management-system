document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const contactList = document.getElementById('contactList');

    // Load contacts from localStorage
    function loadContacts() {
        const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        contactList.innerHTML = '';
        contacts.forEach((contact, index) => {
            addContactToList(contact, index);
        });
    }

    // Add contact to the list and localStorage
    function addContactToList(contact, index) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${contact.name} - ${contact.phone} - ${contact.email}</span>
            <button class="edit-button" onclick="editContact(${index})">Edit</button>
            <button onclick="deleteContact(${index})">Delete</button>
        `;
        contactList.appendChild(li);
    }

    // Handle form submission
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        
        const contact = { name, phone, email };
        const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        contacts.push(contact);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        
        addContactToList(contact, contacts.length - 1);
        contactForm.reset();
    });

    // Edit contact
    window.editContact = function(index) {
        const contacts = JSON.parse(localStorage.getItem('contacts'));
        const contact = contacts[index];
        document.getElementById('name').value = contact.name;
        document.getElementById('phone').value = contact.phone;
        document.getElementById('email').value = contact.email;
        contacts.splice(index, 1);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        loadContacts();
    };

    // Delete contact
    window.deleteContact = function(index) {
        const contacts = JSON.parse(localStorage.getItem('contacts'));
        contacts.splice(index, 1);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        loadContacts();
    };

    // Initial load
    loadContacts();
});
