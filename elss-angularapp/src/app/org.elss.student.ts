import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
import {School,Contact} from './org.elss.common';
// export namespace org.elss.student{
   export class Student extends Asset {
      studentId: string;
      name: string;
      school: School;
      contact: Contact;
      attendance: Attendance;
   }
   export enum Attendance {
      ATTENDED,
      NOT,
   }
   export class createStudent extends Transaction {
      studentId: string;
      name: string;
      school: string;
      email: string;
      cell: string;
   }
   export class modifyStudent extends Transaction {
      studentId: string;
      name: string;
      school: School;
      email: string;
      cell: string;
   }
   export class deleteStudent extends Transaction {
      studentId: string;
   }
   export class setAttendance extends Transaction {
      studentId: string;
      attendance: Attendance;
   }
   export class studentCreated extends Event {
      studentId: string;
   }
   export class studentModified extends Event {
      studentId: string;
   }
   export class studentDeleted extends Event {
      studentId: string;
   }
   export class attendanceSet extends Event {
      studentId: string;
      attendance: Attendance;
   }
// }
