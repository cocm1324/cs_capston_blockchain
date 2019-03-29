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
            var event = factory.newEvent(studentNS, 'studentCreated');
            event.studentId = studentId;
            emit(event);

            // 4. Add to registry
            return studentRegistry.add(student);
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
    var nameBuff = '';
    var schoolBuff = null;
    var emailBuff = '';
    var cellBuff = '';
    
    return getAssetRegistry('org.elss.student.Student').then(function(registry){
        studentRegistry = registry
        return studentRegistry.get(studentData.studentId);
    }).then(function(student){
        if(!student) throw new Error("Student : "+attendanceData.studentId," Not Found!!!");
        
        //modify values
        if(studentData.name){
            student.name = studentData.name;
            nameBuff = studentData.name;
        } else {
            nameBuff = student.name;
        }

        if(studentData.school){
            student.school = studentData.school;
            schoolBuff = studentData.school;
        } else {
            schoolBuff = student.school;
        }
        
        if(studentData.email){
            student.contact.email = studentData.email;
            emailBuff = studentData.email;
        } else {
            emailBuff = student.email;
        }
        
        if(studentData.cell){
            student.contact.cell = studentData.cell;
            cellBuff = studentData.cell;
        } else {
            cellBuff = student.cell;
        }

        return studentRegistry.update(student);
    }).then(function(){
        // Successful update
        var event = getFactory().newEvent('org.elss.student', 'studentModified');
        event.studentId = attendanceData.studentId;
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
function modifyStudent(studentData){
    var studentRegistry={};
    
    return getAssetRegistry('org.elss.student.Student').then(function(registry){
        studentRegistry = registry
        return studentRegistry.remove(studentData.studentId);
    }).then(function(){
        // Successful update
        var event = getFactory().newEvent('org.elss.student', 'studentDeleted');
        event.studentId = attendanceData.studentId;
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


