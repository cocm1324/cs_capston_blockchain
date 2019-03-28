/**
 * 
 * Create avoting box Transaction
 * @param {org.elss.votingbox.createVotingBox} boxData
 * @transaction
 */
function createVotingBox(boxData) {

    return getAssetRegistry('org.elss.votingbox.VotingBox')    
        .then(function(boxRegistry){
            var factory = getFactory();
            var votingBoxNS = 'org.elss.votingbox';
            var commonNS = 'org.elss.common';

            var boxId = generateBoxId(boxData.electionId, boxData.name)
            var box = factory.newResource(votingBoxNS, 'VotingBox', boxId);
            box.name = boxData.name;

            var relationship = factory.newRelationship('org.elss.election','Election',boxData.electionId);
            box.election = relationship;
            
            var event = factory.newEvent(votingBoxNS, 'votingBoxCreated');
            event.electionId = boxData.electionId;
            event.name = boxData.name
            emit(event);

            return boxRegistry.add(box);
        });
}

function generateBoxId(electionId, name) {
    return '' + electionId + ': ' + name
}

/**
 * 
 * Casting a vote Transaction
 * @param {org.elss.votingbox.ballotCast} ballotData
 * @transaction
 */
function ballotCast(ballotData) {
    var boxRegistry={}
    
    return getAssetRegistry('org.elss.votingbox.VotingBox').then(function(registry){
        boxRegistry = registry
        return boxRegistry.get(ballotData.boxId);
    }).then(function(box){
        if(!box) throw new Error("VotingBox : "+ballotData.boxId," Not Found!!!");
        box.ballotCount = box.ballotCount + 1;
        return boxRegistry.update(box);
    }).then(function(){
        // Successful update
        var event = getFactory().newEvent('org.elss.votingbox', 'ballotCasted');
        event.boxId = ballotData.boxId;
        emit(event);
    }).catch(function(error){
        throw new Error(error);
    });
}