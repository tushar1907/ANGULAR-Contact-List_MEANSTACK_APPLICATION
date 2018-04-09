import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ContactService]
})
export class ContactsComponent implements OnInit {

  contacts: Contact[];
  contact: Contact;
  first_name: string;
  last_name: string;
  phone: number;

  constructor(private contactService: ContactService) { }

  ngOnInit() {

    this.contactService.getContacts()
      .subscribe(contacts =>
        this.contacts = contacts);
  }

  //Add the contact
  addContact() {

    const newContact = {
      first_name: this.first_name,
      last_name: this.last_name,
      phone: this.phone
    }
    this.contactService.addContacts(newContact)
      .subscribe(contact => {
        this.contacts.push(contact);
        this.contactService.getContacts()
          .subscribe(contacts =>
            this.contacts = contacts);
      });
      this.first_name = '';
      this.last_name = '';
      this.phone = parseInt('');
  }

  //Delete the contact
  deleteContact(id: any) {

    var contacts = this.contacts;
    this.contactService.deleteContact(id)
      .subscribe(data => {
        if (data.n == 1) {
          for (var i; i < contacts.length; i++) {
            if (contacts[i]._id == id) {
              contacts.splice(i, 1);
            }
          }
        }
        this.contactService.getContacts()
          .subscribe(contacts =>
            this.contacts = contacts);
      });

  }

}
