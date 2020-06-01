
import { PersonComponent } from './person/person.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LoginComponent } from './login/login.component';
import { FamilyComponent } from './family/family.component';
import { PersonAndFamilyStepperComponent} from './person-and-family-stepper/person-and-family-stepper.component';
import { UpdatePersonComponent } from './update-person/update-person.component';
import { DeletePersonComponent } from './delete-person/delete-person.component';
import { CreatePersonComponent } from './create-person/create-person.component';





const routes: Routes = [
 
  { path: 'login', component: LoginComponent },
  { path: 'person', component: PersonComponent },
  { path: 'family', component: FamilyComponent },
  { path: 'personAndFamily', component: PersonAndFamilyStepperComponent },
  { path: 'updatePerson/:id', component: UpdatePersonComponent },
  { path: 'deletePerson/:id', component: DeletePersonComponent },
  { path: 'createPerson', component: CreatePersonComponent },




  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
