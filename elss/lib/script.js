/**
 * 
 * Create Election Transaction
 * @param {org.elss.election.createElection} ElectionData
 * @transaction
 */


// asset Election identified by key{
//     o String key
//     o Schedule schedule
//     o ElectionInfo info
//     --> ElectionLedger electionledger optional
//     --> VotingBox votingbox optional
//     --> Attendance attendance optional
//   }
  
// concept Schedule {
//     o DateTime Date
//     o School school
//     o String name
//   }
// transaction createElection {
//     o School school
//     o String name
//     o Double quorumRate
//   }
  
//   event electionCreated{
//     o String key
//   }

function createElection(ElectionData){
    return getAssetRegistry('org.elss.election.Election')
    .then(function(electionRegistry){

       //Now add the Election
       var factory = getFactory();
       var ns = 'org.elss.election';
       var ns_common = 'org.elss.common';

       var electionKey = generateElectionKey(ElectionData.school);
       var election = factory.newResource(ns, 'Election', electionKey);
       
       var schedule = factory.newConcept(ns_common,'Schedule');
       schedule.name = ElectionData.name;
       schedule.school = ElectionData.school;
       schedule.expiry = ElectionData.expiry;
       election.schedule = schedule;
          
       var electionInfo = factory.newConcept(ns, 'ElectionInfo');
       electionInfo.quorumRate = ElectionData.quorumRate;
       election.info = electionInfo;

       var event = factory.newEvent(ns, 'electionCreated');
       event.key = electionKey;
       emit(event);

       return electionRegistry.add(election);

    })
}
function generateElectionKey(school){
    var dt = new Date.now();

    var month = dt.getMonth();
    var dayNum = dt.getDate();

    return school+'-'+month+'-'+dayNum;
}

/**
* 
* Create Election Transaction
* @param {org.elss.election.assignAll} assignData
* @transaction
*/

// asset Election identified by key{
//     o String key
//     o Schedule schedule
//     o ElectionInfo info
//     --> ElectionLedger electionledger optional
//     --> VotingBox votingbox optional
//     --> Attendance attendance optional
//   }

function AssignAll(assigndata){
    var electionRegistry={}
    return getAssetRegistry('org.elss.election.Election').then(function(registry){
        electionRegistry = registry
        return electionRegistry.get(assignData.electionKey);
    }).then(function(election) {
        if(!election) throw new Error("election: " + assignData.electionKey, " Not Found!!!");
        var factory = getFactory();
        var relationship = factory.newRelationship('org.elss.electionledger','ElectionLedger', assigndata.ledgerKey);
        election.electionledger = relationship;
        
        var relationship_box = factory.newRelationship('org.elss.votingbox', 'VotingBox', assigndata.boxKey);
        election.votingbox = relationship_box;

        var relationship_atd = factory.newRelationship('org.elss.attendance', 'Attendance', assigndata.attendanceKey);
        election.attendance = relationship_atd;
       
        return electionRegistry.update(election);
    }).then(function(){
        var event = getFactory().newEvent('org.elss.election', 'AllAssigned');
        event.electionKey = assigndata.electionKey;
        event.ledgerKey = assigndata.ledgerKey;
        event.boxKey = assigndata.boxKey;
        event.attendancekey = assigndata.attendanceKey;
        emit(event);
    }).catch(function(error){
        throw new Error(error);
    });
}

/**
* 
* Create Election Ledger Transaction
* @param {org.elss.election.createElectionLedger} ElectionLedgerData
* @transaction
*/

// asset ElectionLedger identified by key {
//     o String key
//     o School school
//     o DateTime expiry
//     o VoterInfo[] info optional
//   }
 
//   concept VoterInfo {
//     o String id
//     o String name
//     o School school
//     o Contact contact
//   }
 
//   // Transaction and Event
 
//   transaction createElectionLedger{
//     o School school
//     o DateTime expiry
//   }
 
//   event ElectionLedgerCreated{
//     o String key
//   }

 function createElecLedger(ElectionLedgerData){
   return getAssetRegistry('org.elss.electionledger.ElectionLedger')
    .then(function(electionLedgerRegistry){

       //Now add the Election
       var factory = getFactory();
       var namespace = 'org.elss.electionledger';

       var ledgerKey = generateElectionKey(ElectionLedgerData.school);
       var ledger = factory.newResource(namespace, 'ElectionLedger', ledgerKey);

       ledger.school = ElectionLedgerData.school;
       ledger.expiry = ElectionLedgerData.expiry;

       var event = factory.newEvent(namespace, 'ElectionLedgerCreated');
       event.key = ledgerKey;
       emit(evnet);

       return electionLedgerRegistry.add(ledger);

 })
}

 function generateLedgerKey(school){
   var dt = new Date.now();

   var month = dt.getMonth();
   var dayNum = dt.getDate();

   return school+'-'+month+'-'+dayNum;
}