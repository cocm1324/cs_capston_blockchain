/**
 * 
 * Create Student Information Transaction
 * @param {org.elss.studentinfo.createStudentInfo} studentData
 * @transaction
 */
function createStudentInfo(studentData) {

    return getAssetRegistry('org.elss.studentinfo.StudentInfo')    
        .then(function(studentRegistry){
            var factory = getFactory();
            var studentInfoNS = 'org.elss.studentinfo';
            var commonNS = 'org.elss.common';

            var studentId = studentData.studentId;
            var student = factory.newResource(studentInfoNS, 'StudentInfo', studentData.studentId);
            student.name = studentData.name;
            student.school = studentData.school;

            var contact = factory.newConcept(commonNS, "Contact");

            contact.email = studentData.email;
            contact.cell = studentData.cell;
            student.contact = contact;
            

            // 3 Emit the event FlightCreated
            var event = factory.newEvent(studentInfoNS, 'studentInfoCreated');
            event.studentId = studentId;
            emit(event);

            // 4. Add to registry
            return studentRegistry.add(student);
        });
}

/**
 * 
 * Change the value of Attendance in StudentInfo Transaction
 * @param {org.elss.studentinfo.attendanceCheck} attendanceData
 * @transaction
 */
function attendanceCheck(attendanceData){
    var studentRegistry={}
    
    return getAssetRegistry('org.elss.studentinfo.StudentInfo').then(function(registry){
        studentRegistry = registry
        return studentRegistry.get(attendanceData.studentId);
    }).then(function(student){
        if(!student) throw new Error("Student : "+attendanceData.studentId," Not Found!!!");
        student.attendance = attendanceData.attendance;
        return studentRegistry.update(student);
    }).then(function(){
        // Successful update
        var event = getFactory().newEvent('org.elss.studentinfo', 'attendanceChanged');
        event.studentId = attendanceData.studentId;
        event.attendance = attendanceData.attendance;
        emit(event);
    }).catch(function(error){
        throw new Error(error);
    });
}