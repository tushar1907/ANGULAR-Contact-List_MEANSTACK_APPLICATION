import {Injectable} from '@angular/core';
import {Http ,Headers} from '@angular/http';
import { HttpModule } from '@angular/http';
import {Contact} from './contact';
import 'rxjs/add/operator/map';


@Injectable()
    export class ContactService{

        constructor(private http:Http){ }


        //Retreving contacts
        getContacts(){
            return this.http.get('http://localhost:3001/api/contacts').map(res=> res.json());
             
        }

        //add Contact
        addContacts(newContact){
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            return this.http.post('http://localhost:3001/api/contact',
             newContact, {headers: headers})
             .map(res=> res.json());

        }

        //Delete Contact
        deleteContact(id){
            return this.http.delete('http://localhost:3001/api/contact/'+id)
             .map(res=> res.json());
        }
    }

 