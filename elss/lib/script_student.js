/**
 * 
 * Create Student Information Transaction
 * @param {org.elss.student.createStudent} studentData
 * @transaction
 */
function createStudentInfo(studentData) {

    return getAssetRegistry('org.elss.student.Student')    
        .then(function(studentRegistry){
            var factory = getFactory();
            var studentNS = 'org.elss.student';
            var commonNS = 'org.elss.common';

            var studentId = studentData.studentId;
            var student = factory.newResource(studentNS, 'Student', studentData.studentId);
            student.name = studentData.name;
            student.school = studentData.school;

            var contact = factory.newConcept(commonNS, "Contact");

            contact.email = studentData.email;
            contact.cell = studentData.cell;
            student.contact = contact;
            

            // 3 Emit the event FlightCreated
            var event = factory.newEvent(studentInfoNS, 'studentCreated');
            event.studentId = studentId;
            emit(event);

            // 4. Add to registry
            return studentRegistry.add(student);
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
        if(!student) throw new Error("Student : "+attendanceData.studentId," Not Found!!!");
        student.attendance = attendanceData.attendance;
        return studentRegistry.update(student);
    }).then(function(){
        // Successful update
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
 * Change the value of Attendance in StudentInfo Transaction
 * @param {org.elss.student.setIsVoter} isVoterData
 * @transaction
 */
function setIsVoter(isVoterData){
    var studentRegistry={}
    
    return getAssetRegistry('org.elss.student.Student').then(function(registry){
        studentRegistry = registry
        return studentRegistry.get(isVoterData.studentId);
    }).then(function(student){
        if(!student) throw new Error("Student : "+isVoterData.studentId," Not Found!!!");
        student.isVoter = isVoterData.isVoter;
        return studentRegistry.update(student);
    }).then(function(){
        // Successful update
        var event = getFactory().newEvent('org.elss.student', 'isVoterSet');
        event.studentId = isVoterData.studentId;
        event.isVoter = isVoterData.isVoter;
        emit(event);
    }).catch(function(error){
        throw new Error(error);
    });
}