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
        if(electionBuff.casted.includes(student.studentId)) throw new Error("학번이 "+ castedData.studentId + "인 학생은 이미 투표하였습니다.");

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



/**
 * 
 * Create Student Information Transaction
 * @param {org.elss.student.createStudent} studentData
 * @transaction
 */
function createStudent(studentData) {
    
    return getAssetRegistry('org.elss.student.Student').then(function(studentRegistry){
        var factory = getFactory();

        var student = factory.newResource('org.elss.student', 'Student', studentData.studentId);
        student.name = studentData.name;
        student.school = studentData.school;

        var contact = factory.newConcept('org.elss.common', "Contact");

        contact.email = studentData.email;
        contact.cell = studentData.cell;
        student.contact = contact;
        
        return studentRegistry.add(student);
    }).then(function(){
        var event = getFactory().newEvent('org.elss.student', 'studentCreated');
        event.studentId = studentData.studentId;
        emit(event);
    });
}

/**
 * 
 * Create Student Information Transaction
 * @param {org.elss.student.modifyStudent} studentData
 * @transaction
 */
function modifyStudent(studentData){
    var studentRegistry={};

    return getAssetRegistry('org.elss.student.Student').then(function(registry){
        studentRegistry = registry
        return studentRegistry.get(studentData.studentId);
    }).then(function(student){
        if(!student) throw new Error("학번이 " + studentData.studentId + "인 학생은 리스트에 존재하지 않습니다.");
        if(!studentData.name) throw new Error("이름은 필수 항목입니다.");
        if(!studentData.school) throw new Error("학부는 필수 항목입니다.");

        student.name = studentData.name;
        student.school = studentData.school;
        student.contact.email = studentData.email;
        student.contact.cell = studentData.cell;

        return studentRegistry.update(student);
    }).then(function(){
        var event = getFactory().newEvent('org.elss.student', 'studentModified');
        event.studentId = studentData.studentId;
        emit(event);
    }).catch(function(error){
        throw new Error(error);
    });
}

/**
 * 
 * Create Student Information Transaction
 * @param {org.elss.student.deleteStudent} studentData
 * @transaction
 */
function deleteStudent(studentData){
    var studentRegistry={};
    
    return getAssetRegistry('org.elss.student.Student').then(function(registry){
        studentRegistry = registry
        return studentRegistry.get(studentData.studentId);
    }).then(function(student){
        if(!student) throw new Error("학번이 " + studentData.studentId + "인 학생은 리스트에 존재하지 않습니다.");

        return studentRegistry.remove(student);
    }).then(function(){
        var event = getFactory().newEvent('org.elss.student', 'studentDeleted');
        event.studentId = studentData.studentId;
        emit(event);
    }).catch(function(error){
        throw new Error(error);
    });
}

/**
 * 
 * Change the value of Attendance in StudentInfo Transaction
 * @param {org.elss.student.setAttendance} attendanceData
 * @transaction
 */
function setAttendance(attendanceData){
    var studentRegistry={}
    
    return getAssetRegistry('org.elss.student.Student').then(function(registry){
        studentRegistry = registry
        return studentRegistry.get(attendanceData.studentId);
    }).then(function(student){
        if(!student) throw new Error("학번이 " + attendanceData.studentId + "인 학생은 리스트에 존재하지 않습니다.");
        student.attendance = attendanceData.attendance;
        return studentRegistry.update(student);
    }).then(function(){
        var event = getFactory().newEvent('org.elss.student', 'attendanceSet');
        event.studentId = attendanceData.studentId;
        event.attendance = attendanceData.attendance;
        emit(event);
    }).catch(function(error){
        throw new Error(error);
    });
}


/**
 * 
 * Create avoting box Transaction
 * @param {org.elss.votingbox.createVotingBox} boxData
 * @transaction
 */
function createVotingBox(boxData) {
    var boxRegistry = {};
    var electionRegistry = {};
    var boxBuff = {};
    var electionBuff = {};
    var boxId = '';

    return getAssetRegistry('org.elss.votingbox.VotingBox').then(function(registry1){
        boxRegistry = registry1;

        var factory1 = getFactory();
        boxId = '' + boxData.electionKey + ':' + boxData.name;
        var box = factory1.newResource('org.elss.votingbox', 'VotingBox', boxId);
        box.name = boxData.name;

        var relationship1 = factory1.newRelationship('org.elss.election','Election',boxData.electionKey);
        box.election = relationship1;
        boxBuff = box;

        return getAssetRegistry('org.elss.election.Election');
    }).then(function(registry2){
        electionRegistry = registry2;
        return electionRegistry.get(boxData.electionKey);
    }).then(function(election){
        if(!election) throw new Error(""+ boxData.electionKey + "(은)는 리스트에 존재하지 않습니다.");
        if(election.status!='PREP') throw new Error("" + boxData.electionKey + "(은)는 현재 선거준비 상태가 아닙니다.");
        
        electionBuff = election;

        return boxRegistry.add(boxBuff);
    }).then(function(){
        var factory2 = getFactory();
        var relationship2 = factory2.newRelationship('org.elss.votingbox','VotingBox',boxId);
        electionBuff.boxes.unshift(relationship2);
        
        return electionRegistry.update(electionBuff);
    }).then(function(){
        var event = getFactory().newEvent('org.elss.votingbox', 'votingBoxCreated');
        event.electionKey = boxData.electionKey;
        event.boxId = boxId;
        emit(event);
    }).catch(function(error){
        throw new Error(error);
    });

}

/**
 * 
 * Casting a vote Transaction
 * @param {org.elss.votingbox.deleteVotingBox} boxData
 * @transaction
 */
function deleteVotingBox(boxData) {
    var boxRegistry = {};
    var electionRegistry = {};
    var boxBuff = {};
    var electionKey = '';
    
    return getAssetRegistry('org.elss.votingbox.VotingBox').then(function(registry1){
        boxRegistry = registry1
        return boxRegistry.get(boxData.boxId);
    }).then(function(box){
        if(!box) throw new Error("" + boxData.boxId + "(은)는 리스트에 존재하지 않습니다.");
        boxBuff = box;
        electionKey = box.election.getIdentifier();

        return getAssetRegistry('org.elss.election.Election');
    }).then(function(registry2){
        electionRegistry = registry2;
        return electionRegistry.get(electionKey);
    }).then(function(election){
        if(!election) throw new Error(""+ electionKey + "(은)는 리스트에 존재하지 않습니다.");
        if(election.status!='PREP') throw new Error("" + electionKey + "(은)는 현재 선거준비 상태가 아닙니다.");

        return boxRegistry.remove(boxBuff);
    }).then(function(){
        var event = getFactory().newEvent('org.elss.votingbox', 'votingBoxDeleted');
        event.boxId = boxData.boxId;
        emit(event);
    }).catch(function(error){
        throw new Error(error);
    });
}

/**
 * 
 * Casting a vote Transaction
 * @param {org.elss.votingbox.ballotCast} ballotData
 * @transaction
 */
function ballotCast(ballotData) {
    var boxRegistry={};
    var electionRegistry={};
    var boxBuff={};
    var electionKey = "";
    
    return getAssetRegistry('org.elss.votingbox.VotingBox').then(function(registry1){
        boxRegistry = registry1;
        return boxRegistry.get(ballotData.boxId);
    }).then(function(box){
        if(!box) throw new Error("" + ballotData.boxId + "(은)는 리스트에 존재하지 않습니다.");
        
        boxBuff = box;
        electionKey = box.election.getIdentifier();
        
        return getAssetRegistry('org.elss.election.Election');
    }).then(function(registry2){
        electionRegistry = registry2;
        return electionRegistry.get(electionKey);
    }).then(function(election){
        if(!election) throw new Error(""+ electionKey + "(은)는 리스트에 존재하지 않습니다.");
        if(election.status!='POLL') throw new Error("" + electionKey + "(은)는 현재 선거진행 상태가 아닙니다.");

        boxBuff.ballotCount = boxBuff.ballotCount + 1;

        return boxRegistry.update(boxBuff);
    }).then(function(){
        // Successful update
        var event = getFactory().newEvent('org.elss.votingbox', 'ballotCasted');
        event.boxId = ballotData.boxId;
        emit(event);
    }).catch(function(error){
        throw new Error(error);
    });
}