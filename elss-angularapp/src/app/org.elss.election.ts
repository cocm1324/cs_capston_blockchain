import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
import {School} from './org.elss.common';
import {VotingBox} from './org.elss.votingbox';
// export namespace org.elss.election{
   export class Election extends Asset {
      electionKey: string;
      name: string;
      school: School;
      electionDate: Date;
      quorumRate: number;
      status: Status;
      casted: string[];
      boxes: VotingBox[];
   }
   export enum Status {
      PREP,
      POLL,
      END,
   }
   export class createElection extends Transaction {
      school: School;
      name: string;
      electionDate: Date;
      quorumRate: number;
   }
   export class deleteElection extends Transaction {
      electionKey: string;
   }
   export class changeElectionStatus extends Transaction {
      electionKey: string;
      status: Status;
   }
   export class addVotingBox extends Transaction {
      electionKey: string;
      boxId: string;
   }
   export class addCasted extends Transaction {
      electionKey: string;
      studentId: string;
   }
   export class electionCreated extends Event {
      electionKey: string;
   }
   export class electionDeleted extends Event {
      electionKey: string;
   }
   export class statusChanged extends Event {
      status: Status;
   }
   export class votingBoxAdded extends Event {
      electionKey: string;
      boxId: string;
   }
   export class castedAdded extends Event {
      electionKey: string;
      studentId: string;
   }
// }
