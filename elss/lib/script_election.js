/**
 * 
 * Create Election Transaction
 * @param {org.elss.election.createElection} ElectionData
 * @transaction
 */

function createElection(ElectionData){
    return getAssetRegistry('org.elss.election.Election')
    .then(function(electionRegistry){

       //Now add the Election
       var factory = getFactory();
       var ns = 'org.elss.election';
       var ns_common = 'org.elss.common';

       var casted = [];

       var electionKey = generateElectionKey(ElectionData.school);
       var election = factory.newResource(ns, 'Election', electionKey);
       
       console.log('hihihi');
       election.name = ElectionData.name;
       election.school = ElectionData.school;
       election.electionDate = ElectionData.electionDate;

       var electionInfo = factory.newConcept(ns, 'ElectionInfo');
       electionInfo.quorumRate = ElectionData.quorumRate;
       election.info = electionInfo;        
       election.casted = casted;

       var event = factory.newEvent(ns, 'electionCreated');
       event.key = electionKey;
       emit(event);

       return electionRegistry.add(election);

    })
}

function generateElectionKey(school){
    var dt = new Date(2018,04,05,06,0,0,0,0);

    var year = dt.getFullYear()%100;
    var month = dt.getMonth()+1;
    var dayNum = dt.getDate();

    return school+year+month+dayNum+'Election';
}


/**
 * 
 * Change the value of Attendance in StudentInfo Transaction
 * @param {org.elss.election.changeElecStatus} statusData
 * @transaction
 */
function changeElecStatus(statusData){
    var statusRegistry={}
    
    return getAssetRegistry('org.elss.election.Election').then(function(registry){
        statusRegistry = registry
        return statusRegistry.get(statusData.key);
    }).then(function(status){
        if(!status) throw new Error("Status : "+statusData,key," Not Found!!!");
        status.status= statusData.status;
        return statusRegistry.update(status);
    }).then(function(){
        // Successful update
        var event = getFactory().newEvent('org.elss.election', 'statusChanged');
        event.status = statusData.status;
        emit(event);
    }).catch(function(error){
        throw new Error(error);
    });
}
