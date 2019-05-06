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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Election', component: ElectionComponent },
  { path: 'Student', component: StudentComponent },
  { path: 'VotingBox', component: VotingBoxComponent },
  { path: 'AONetworkAdmin', component: AONetworkAdminComponent },
  { path: 'AOPersonnel', component: AOPersonnelComponent },
  { path: 'EMNetworkAdmin', component: EMNetworkAdminComponent },
  { path: 'EMPersonnel', component: EMPersonnelComponent },
  { path: 'Voters', component: VotersComponent },
  { path: 'TFNetworkAdmin', component: TFNetworkAdminComponent },
  { path: 'TFPersonnel', component: TFPersonnelComponent },
  { path: 'createElection', component: createElectionComponent },
  { path: 'deleteElection', component: deleteElectionComponent },
  { path: 'changeElectionStatus', component: changeElectionStatusComponent },
  { path: 'addVotingBox', component: addVotingBoxComponent },
  { path: 'addCasted', component: addCastedComponent },
  { path: 'createStudent', component: createStudentComponent },
  { path: 'modifyStudent', component: modifyStudentComponent },
  { path: 'deleteStudent', component: deleteStudentComponent },
  { path: 'setAttendance', component: setAttendanceComponent },
  { path: 'createVotingBox', component: createVotingBoxComponent },
  { path: 'deleteVotingBox', component: deleteVotingBoxComponent },
  { path: 'ballotCast', component: ballotCastComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
