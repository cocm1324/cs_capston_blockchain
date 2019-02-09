/*
  transaction CreateStudentInfo {
    o String studentId
    o String name
    o String school
    o String email
    o String cell
  }
  
  transaction AttendanceCheck {
    o String studentId
    o Attendance attendance
  }
*/

function CreateStudentInfo(studentData) {

    return getAssetRegistry('org.elss.studentinfo.StudentInfo')    
        .then(function(studentRegistry){
            var factory = getFactory();
            var studentInfoNS = 'org.elss.StudentInfo';
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
            var event = factory.newEvent(studentInfoNS, 'StudentInfoCreated');
            event.studentId = studentId;
            emit(event);

            // 4. Add to registry
            return studentRegistry.add(student);
        });
}


function AttendanceCheck(attendanceData){
    var studentRegistry={}
    
    return getAssetRegistry('org.elss.studentinfo.StudentInfo').then(function(registry){
        studentRegistry = registry
        return studentRegistry.get(attendanceData.studentId);
    }).then(function(student){
        if(!student) throw new Error("Student : "+attendanceData.studentId," Not Found!!!");
        var   factory = getFactory();
        student.attendance = attendanceData.attendance;
        return studentRegistry.update(student);
    }).then(function(){
        // Successful update
        var event = getFactory().newEvent('org.elss.studentinfo', 'AttendanceChanged');
        event.studentId = attendanceData.studentId;
        event.attendance = atttendanceData.attendance;
        emit(event);
    }).catch(function(error){
        throw new Error(error);
    });
}
