import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
import {Election} from './org.elss.election';
// export namespace org.elss.votingbox{
   export class VotingBox extends Asset {
      boxId: string;
      name: string;
      ballotCount: number;
      election: Election;
   }
   export class createVotingBox extends Transaction {
      electionKey: string;
      name: string;
   }
   export class deleteVotingBox extends Transaction {
      boxId: string;
   }
   export class ballotCast extends Transaction {
      boxId: string;
   }
   export class votingBoxCreated extends Event {
      electionKey: string;
      boxId: string;
   }
   export class votingBoxDeleted extends Event {
      boxId: string;
   }
   export class ballotCasted extends Event {
      boxId: string;
   }
// }
