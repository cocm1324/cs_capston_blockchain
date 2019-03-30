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


