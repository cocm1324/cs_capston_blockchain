/**
 * 
 * Create Election Transaction
 * @param {org.elss.election.createElection} ElectionData
 * @transaction
 */
function createElection(ElectionData){
    return getAssetRegistry('org.elss.election.Election')
    .then(function(electionRegistry){

       var factory = getFactory();
       var ns = 'org.elss.election';

       var casted = [];
       var boxes = [];

       var electionKey = generateElectionKey(ElectionData.school);
       var election = factory.newResource(ns, 'Election', electionKey);
       
       election.name = ElectionData.name;
       election.school = ElectionData.school;
       election.electionDate = ElectionData.electionDate;
       election.quorumRate = ElectionData.quorumRate;
       election.boxes = boxes;    
       election.casted = casted;

       var event = factory.newEvent(ns, 'electionCreated');
       event.key = electionKey;
       emit(event);

       return electionRegistry.add(election);
    })
}

function generateElectionKey(school){
    var dt = new Date(2019,04,05,06,0,0,0,0);

    var year = dt.getFullYear()%100;
    var month = dt.getMonth()+1;
    var dayNum = dt.getDate();

    return school+year+month+dayNum+'Election';
}

/**
 * 
 * Change the value of Attendance in StudentInfo Transaction
 * @param {org.elss.election.modifiyElection} ElectionData
 * @transaction
 */
function modifiyElection(ElectionData) {
    var electionRegistry={};
    var electionDateBuff = '';
    var quorumRateBuff = 0.0;
    
    return getAssetRegistry('org.elss.election.Election').then(function(registry){
        electionRegistry = registry
        return electionRegistry.get(electionData.electionKey);
    }).then(function(election){
        if(!election) throw new Error("Election : " + electionData.electionKey + " Not Found!!!");
        
        //modify values
        if(ElectionData.electionDate){
            election.electionDate = ElectionData.electionDate;
            electionDateBuff = ElectionData.electionDate
        } else {
            electionDateBuff = election.electionDate;
        }
        if(ElectionData.quorumRate){
            election.quorumRate = ElectionData.quorumRate;
            quorumRateBuff = electionData.quorumRate;
        } else {
            quorumRateBuff = election.quorumRate;
        }

        return electionRegistry.update(election);
    }).then(function(){
        // Successful update
        var event = getFactory().newEvent('org.elss.election', 'electionModified');
        event.electionKey = ElectionData.electionKey;
        event.electionDate = electionDateBuff;
        event.quorumRate = quorumRateBuff;
        emit(event);
    }).catch(function(error){
        throw new Error(error);
    });
}

/**
 * 
 * Change the value of Attendance in StudentInfo Transaction
 * @param {org.elss.election.deleteElection} ElectionData
 * @transaction
 */
function deleteElection(ElectionData) {
    var electionRegistry={};
    
    return getAssetRegistry('org.elss.election.Election').then(function(registry){
        electionRegistry = registry;
        return electionRegistry.remove(ElectionData.electionKey);
    }).then(function(){
        // Successful update
        var event = getFactory().newEvent('org.elss.election', 'electionDeleted');
        event.electionKey = ElectionData.electionKey;
        emit(event);
    }).catch(function(error){
        throw new Error(error);
    });
}

/**
 * 
 * Change the value of Attendance in StudentInfo Transaction
 * @param {org.elss.election.changeElecStatus} statusData
 * @transaction
 */
function changeElecStatus(statusData){
    var electionRegistry={}
    
    return getAssetRegistry('org.elss.election.Election').then(function(registry){
        electionRegistry = registry
        return electionRegistry.get(statusData.electionKey);
    }).then(function(election){
        if(!election) throw new Error("Election : " + statusData.key + " Not Found!!!");
        election.status= statusData.status;
        return electionRegistry.update(election);
    }).then(function(){
        // Successful update
        var event = getFactory().newEvent('org.elss.election', 'statusChanged');
        event.status = statusData.status;
        emit(event);
    }).catch(function(error){
        throw new Error(error);
    });
}

/**
 * 
 * Change the value of Attendance in StudentInfo Transaction
 * @param {org.elss.election.addCasted} castedData
 * @transaction
 */
function addCasted(castedData) {
    var electionRegistry={};
    
    return getAssetRegistry('org.elss.election.Election').then(function(registry){
        electionRegistry = registry;
        return electionRegistry.get(castedData.electionKey);
    }).then(function(election){
        if(!election) throw new Error("Election : "+ statusData.electionKey + " Not Found!!!");
        if(election.status!=POLL) throw new Error("Election : " + statusData.key + " in Not in Polling Stage!!!");
        
        var studentInfo = factory.newConcept("org.elss.election", "studentInfo");

        studentInfo.studentId = castedData.studentId;
        studentInfo.name = castedData.name;
                
        election.casted.unshift(studentInfo);

        return statusRegistry.update(status);
    }).then(function(){
        // Successful update
        var event = getFactory().newEvent('org.elss.election', 'statusChanged');
        event.electionKey = castedData.electionKey;
        event.studentId = castedData.studentId;
        event.name = castedData.name;
        emit(event);
    }).catch(function(error){
        throw new Error(error);
    });
}
