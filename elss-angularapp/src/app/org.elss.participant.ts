import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
import {Contact,School} from './org.elss.common';
// export namespace org.elss.participant{
   export abstract class ObjectPrimitive extends Participant {
      key: string;
   }
   export abstract class ParticipantPrimitive extends ObjectPrimitive {
      name: string;
      contact: Contact;
   }
   export class AONetworkAdmin extends ParticipantPrimitive {
   }
   export class AOPersonnel extends ParticipantPrimitive {
      department: string;
   }
   export class EMNetworkAdmin extends ParticipantPrimitive {
   }
   export class EMPersonnel extends ParticipantPrimitive {
   }
   export class Voters extends ParticipantPrimitive {
   }
   export class TFNetworkAdmin extends ParticipantPrimitive {
   }
   export class TFPersonnel extends ParticipantPrimitive {
      school: School;
   }
// }
