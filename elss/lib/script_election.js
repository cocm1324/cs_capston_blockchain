/**
 * 
 * Create Election Transaction
 * @param {org.elss.election.createElection} ElectionData
 * @transaction
 */
function createElection(ElectionData){
    return getAssetRegistry('org.elss.election.Election').then(function(electionRegistry){

       var factory = getFactory();
       var ns = 'org.elss.election';

       var casted = [];
       var boxes = [];

       var electionKey = generateElectionKey(ElectionData.school, ElectionData.electionDate, ElectionData.name);
       var election = factory.newResource(ns, 'Election', electionKey);
       
       election.name = ElectionData.name;
       election.school = ElectionData.school;
       election.electionDate = ElectionData.electionDate;
       election.quorumRate = ElectionData.quorumRate;
       election.boxes = boxes;    
       election.casted = casted;

       var event = factory.newEvent(ns, 'electionCreated');
       event.electionKey = electionKey;
       emit(event);

       return electionRegistry.add(election);
    })
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
        return electionRegistry.get(ElectionData.electionKey);
    }).then(function(election){
        if(!election) throw new Error(""+ electionData.electionKey + "(은)는 리스트에 존재하지 않습니다.");
        if(election.status!='PREP') throw new Error("" + electionData.electionKey + "(은)는 현재 선거준비 상태가 아닙니다.");

        return electionRegistry.remove(election);
    }).then(function(){
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
 * @param {org.elss.election.changeElectionStatus} statusData
 * @transaction
 */
function changeElectionStatus(statusData){
    var electionRegistry={}
    
    return getAssetRegistry('org.elss.election.Election').then(function(registry){
        electionRegistry = registry
        return electionRegistry.get(statusData.electionKey);
    }).then(function(election){
        if(!election) throw new Error(""+ statusData.electionKey + "(은)는 리스트에 존재하지 않습니다.");
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
 * @param {org.elss.election.addVotingBox} boxData
 * @transaction
 */
function addVotingBox(boxData) {
    var electionRegistry = {};

    return getAssetRegistry('org.elss.election.Election').then(function(registry) {
        electionRegistry = registry;
        return electionRegistry.get(boxData.electionKey);
    }).then(function(election) {
        if(!election) throw new Error(""+ boxData.electionKey + "(은)는 리스트에 존재하지 않습니다.");
        
        var factory = getFactory();
        var relationship = factory.newRelationship('org.elss.votingbox','VotingBox',boxData.boxId);
        election.boxes.unshift(relationship);

        return electionRegistry.update(election);
    }).then(function() {
        var event = getFactory().newEvent('org.elss.election', 'votingBoxAdded');
        event.electionKey = boxData.electionKey;
        event.boxId = boxData.boxId;
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
    var studentRegistry={};
    var electionBuff={};

    return getAssetRegistry('org.elss.election.Election').then(function(registry1){
        electionRegistry = registry1;
        return electionRegistry.get(castedData.electionKey);
    }).then(function(election){
        if(!election) throw new Error(""+ castedData.electionKey + "(은)는 리스트에 존재하지 않습니다.");
        if(election.status!='POLL') throw new Error("" + castedData.electionKey + "(은)는 현재 선거진행 상태가 아닙니다.");
        
        electionBuff = election;

        return getAssetRegistry('org.elss.student.Student');
    }).then(function(registry2){
        studentRegistry = registry2;
        return studentRegistry.get(castedData.studentId);
    }).then(function(student){
        if(!student) throw new Error("학번이 " + castedData.studentId + "인 학생은 리스트에 존재하지 않습니다.");
        if(student.attendance == 'NOT') throw new Error("학번이 "+ castedData.studentId + "인 학생은 출석으로 처리되지 않았습니다.");
        if(electionBuff.school != student.school) throw new Error("학번이 "+ castedData.studentId + "인 학생은 " + electionBuff.school + "학부의 정회원이 아닙니다.");

        electionBuff.casted.unshift(castedData.studentId);

        return electionRegistry.update(electionBuff);
    }).then(function(){
        // Successful update
        var event = getFactory().newEvent('org.elss.election', 'castedAdded');
        event.electionKey = castedData.electionKey;
        event.studentId = castedData.studentId;
        emit(event);
    }).catch(function(error){
        throw new Error(error);
    });
}





/*

Hellper functions

*/
function generateElectionKey(school, dateTime, name){

    var electionDate = new Date(dateTime);

    var year = electionDate.getFullYear()%100;
    var month = electionDate.getMonth()+1;
    var day = electionDate.getDate();

    if(year < 10) year = '0' + year;
    if(month < 10) month = '0' + month;
    if(day < 10) day = '0' + day;

    return school+year+month+day+name;
}