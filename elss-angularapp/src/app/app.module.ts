/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { ElectionComponent } from './Election/Election.component';
import { StudentComponent } from './Student/Student.component';
import { VotingBoxComponent } from './VotingBox/VotingBox.component';

import { AONetworkAdminComponent } from './AONetworkAdmin/AONetworkAdmin.component';
import { AOPersonnelComponent } from './AOPersonnel/AOPersonnel.component';
import { EMNetworkAdminComponent } from './EMNetworkAdmin/EMNetworkAdmin.component';
import { EMPersonnelComponent } from './EMPersonnel/EMPersonnel.component';
import { VotersComponent } from './Voters/Voters.component';
import { TFNetworkAdminComponent } from './TFNetworkAdmin/TFNetworkAdmin.component';
import { TFPersonnelComponent } from './TFPersonnel/TFPersonnel.component';

import { createElectionComponent } from './createElection/createElection.component';
import { deleteElectionComponent } from './deleteElection/deleteElection.component';
import { changeElectionStatusComponent } from './changeElectionStatus/changeElectionStatus.component';
import { addVotingBoxComponent } from './addVotingBox/addVotingBox.component';
import { addCastedComponent } from './addCasted/addCasted.component';
import { createStudentComponent } from './createStudent/createStudent.component';
import { modifyStudentComponent } from './modifyStudent/modifyStudent.component';
import { deleteStudentComponent } from './deleteStudent/deleteStudent.component';
import { setAttendanceComponent } from './setAttendance/setAttendance.component';
import { createVotingBoxComponent } from './createVotingBox/createVotingBox.component';
import { deleteVotingBoxComponent } from './deleteVotingBox/deleteVotingBox.component';
import { ballotCastComponent } from './ballotCast/ballotCast.component';

  @NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ElectionComponent,
    StudentComponent,
    VotingBoxComponent,
    AONetworkAdminComponent,
    AOPersonnelComponent,
    EMNetworkAdminComponent,
    EMPersonnelComponent,
    VotersComponent,
    TFNetworkAdminComponent,
    TFPersonnelComponent,
    createElectionComponent,
    deleteElectionComponent,
    changeElectionStatusComponent,
    addVotingBoxComponent,
    addCastedComponent,
    createStudentComponent,
    modifyStudentComponent,
    deleteStudentComponent,
    setAttendanceComponent,
    createVotingBoxComponent,
    deleteVotingBoxComponent,
    ballotCastComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
