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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ElectionService } from './Election.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-election',
  templateUrl: './Election.component.html',
  styleUrls: ['./Election.component.css'],
  providers: [ElectionService]
})
export class ElectionComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  electionKey = new FormControl('', Validators.required);
  name = new FormControl('', Validators.required);
  school = new FormControl('', Validators.required);
  electionDate = new FormControl('', Validators.required);
  quorumRate = new FormControl('', Validators.required);
  status = new FormControl('', Validators.required);
  casted = new FormControl('', Validators.required);
  boxes = new FormControl('', Validators.required);

  constructor(public serviceElection: ElectionService, fb: FormBuilder) {
    this.myForm = fb.group({
      electionKey: this.electionKey,
      name: this.name,
      school: this.school,
      electionDate: this.electionDate,
      quorumRate: this.quorumRate,
      status: this.status,
      casted: this.casted,
      boxes: this.boxes
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceElection.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.elss.election.Election',
      'electionKey': this.electionKey.value,
      'name': this.name.value,
      'school': this.school.value,
      'electionDate': this.electionDate.value,
      'quorumRate': this.quorumRate.value,
      'status': this.status.value,
      'casted': this.casted.value,
      'boxes': this.boxes.value
    };

    this.myForm.setValue({
      'electionKey': null,
      'name': null,
      'school': null,
      'electionDate': null,
      'quorumRate': null,
      'status': null,
      'casted': null,
      'boxes': null
    });

    return this.serviceElection.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'electionKey': null,
        'name': null,
        'school': null,
        'electionDate': null,
        'quorumRate': null,
        'status': null,
        'casted': null,
        'boxes': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.elss.election.Election',
      'name': this.name.value,
      'school': this.school.value,
      'electionDate': this.electionDate.value,
      'quorumRate': this.quorumRate.value,
      'status': this.status.value,
      'casted': this.casted.value,
      'boxes': this.boxes.value
    };

    return this.serviceElection.updateAsset(form.get('electionKey').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceElection.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceElection.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'electionKey': null,
        'name': null,
        'school': null,
        'electionDate': null,
        'quorumRate': null,
        'status': null,
        'casted': null,
        'boxes': null
      };

      if (result.electionKey) {
        formObject.electionKey = result.electionKey;
      } else {
        formObject.electionKey = null;
      }

      if (result.name) {
        formObject.name = result.name;
      } else {
        formObject.name = null;
      }

      if (result.school) {
        formObject.school = result.school;
      } else {
        formObject.school = null;
      }

      if (result.electionDate) {
        formObject.electionDate = result.electionDate;
      } else {
        formObject.electionDate = null;
      }

      if (result.quorumRate) {
        formObject.quorumRate = result.quorumRate;
      } else {
        formObject.quorumRate = null;
      }

      if (result.status) {
        formObject.status = result.status;
      } else {
        formObject.status = null;
      }

      if (result.casted) {
        formObject.casted = result.casted;
      } else {
        formObject.casted = null;
      }

      if (result.boxes) {
        formObject.boxes = result.boxes;
      } else {
        formObject.boxes = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'electionKey': null,
      'name': null,
      'school': null,
      'electionDate': null,
      'quorumRate': null,
      'status': null,
      'casted': null,
      'boxes': null
      });
  }

}
