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

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for elss-angularapp', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be elss-angularapp', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('elss-angularapp');
    })
  });

  it('network-name should be elss@0.0.4',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('elss@0.0.4.bna');
    });
  });

  it('navbar-brand should be elss-angularapp',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('elss-angularapp');
    });
  });

  
    it('Election component should be loadable',() => {
      page.navigateTo('/Election');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Election');
      });
    });

    it('Election table should have 9 columns',() => {
      page.navigateTo('/Election');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(9); // Addition of 1 for 'Action' column
      });
    });
  
    it('Student component should be loadable',() => {
      page.navigateTo('/Student');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Student');
      });
    });

    it('Student table should have 6 columns',() => {
      page.navigateTo('/Student');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });
  
    it('VotingBox component should be loadable',() => {
      page.navigateTo('/VotingBox');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('VotingBox');
      });
    });

    it('VotingBox table should have 5 columns',() => {
      page.navigateTo('/VotingBox');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('AONetworkAdmin component should be loadable',() => {
      page.navigateTo('/AONetworkAdmin');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('AONetworkAdmin');
      });
    });

    it('AONetworkAdmin table should have 4 columns',() => {
      page.navigateTo('/AONetworkAdmin');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });
  
    it('AOPersonnel component should be loadable',() => {
      page.navigateTo('/AOPersonnel');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('AOPersonnel');
      });
    });

    it('AOPersonnel table should have 5 columns',() => {
      page.navigateTo('/AOPersonnel');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });
  
    it('EMNetworkAdmin component should be loadable',() => {
      page.navigateTo('/EMNetworkAdmin');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('EMNetworkAdmin');
      });
    });

    it('EMNetworkAdmin table should have 4 columns',() => {
      page.navigateTo('/EMNetworkAdmin');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });
  
    it('EMPersonnel component should be loadable',() => {
      page.navigateTo('/EMPersonnel');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('EMPersonnel');
      });
    });

    it('EMPersonnel table should have 4 columns',() => {
      page.navigateTo('/EMPersonnel');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });
  
    it('Voters component should be loadable',() => {
      page.navigateTo('/Voters');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Voters');
      });
    });

    it('Voters table should have 4 columns',() => {
      page.navigateTo('/Voters');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });
  
    it('TFNetworkAdmin component should be loadable',() => {
      page.navigateTo('/TFNetworkAdmin');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('TFNetworkAdmin');
      });
    });

    it('TFNetworkAdmin table should have 4 columns',() => {
      page.navigateTo('/TFNetworkAdmin');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });
  
    it('TFPersonnel component should be loadable',() => {
      page.navigateTo('/TFPersonnel');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('TFPersonnel');
      });
    });

    it('TFPersonnel table should have 5 columns',() => {
      page.navigateTo('/TFPersonnel');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('createElection component should be loadable',() => {
      page.navigateTo('/createElection');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('createElection');
      });
    });
  
    it('deleteElection component should be loadable',() => {
      page.navigateTo('/deleteElection');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('deleteElection');
      });
    });
  
    it('changeElectionStatus component should be loadable',() => {
      page.navigateTo('/changeElectionStatus');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('changeElectionStatus');
      });
    });
  
    it('addVotingBox component should be loadable',() => {
      page.navigateTo('/addVotingBox');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('addVotingBox');
      });
    });
  
    it('addCasted component should be loadable',() => {
      page.navigateTo('/addCasted');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('addCasted');
      });
    });
  
    it('createStudent component should be loadable',() => {
      page.navigateTo('/createStudent');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('createStudent');
      });
    });
  
    it('modifyStudent component should be loadable',() => {
      page.navigateTo('/modifyStudent');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('modifyStudent');
      });
    });
  
    it('deleteStudent component should be loadable',() => {
      page.navigateTo('/deleteStudent');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('deleteStudent');
      });
    });
  
    it('setAttendance component should be loadable',() => {
      page.navigateTo('/setAttendance');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('setAttendance');
      });
    });
  
    it('createVotingBox component should be loadable',() => {
      page.navigateTo('/createVotingBox');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('createVotingBox');
      });
    });
  
    it('deleteVotingBox component should be loadable',() => {
      page.navigateTo('/deleteVotingBox');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('deleteVotingBox');
      });
    });
  
    it('ballotCast component should be loadable',() => {
      page.navigateTo('/ballotCast');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('ballotCast');
      });
    });
  

});